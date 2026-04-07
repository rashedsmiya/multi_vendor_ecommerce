<?php

namespace App\Http\Controllers\Backend\Operator;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\CourseLesson;
use App\Models\CourseSection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CourseController extends Controller
{
    /**
     * List operator courses.
     */
    public function index(Request $request): Response
    {
        $baseQuery = Course::self();

        $stats = [
            'total_courses' => (clone $baseQuery)->count(),
            'total_students' => (int) (clone $baseQuery)->sum('total_enrollments'),
            'total_revenue' => (float) (clone $baseQuery)->selectRaw('SUM(price * total_enrollments) as revenue')->value('revenue'),
            'active_courses' => (clone $baseQuery)->where('is_active', true)->count(),
        ];

        $courses = Course::self()->latest()->paginate(6);

        return Inertia::render('backend/Operator/Courses/Index', [
            'courses' => $courses,
            'stats' => $stats,
        ]);
    }

    /**
     * Show create course form (step 1 — course details only).
     */
    public function create(): Response
    {
        return Inertia::render('backend/Operator/Courses/creates/step1');
    }

    /**
     * Step 2 — build curriculum (modules & lessons) for a course.
     */
    public function curriculum(Course $course): Response
    {
        if ($course->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('backend/Operator/Courses/creates/step2', [
            'course' => $course->load(['sections.lessons']),
        ]);
    }

    /**
     * Step 1 — store course shell (basic info, thumbnail, certificate). Curriculum is saved separately.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate(self::courseStoreRules());

        $baseSlug = Str::slug($validated['title']);
        $slug = $baseSlug;
        $i = 2;
        while (Course::query()->where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$i}";
            $i++;
        }

        $thumbnailUrl = null;
        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('courses/thumbnails', 'public');
            $thumbnailUrl = Storage::url($path);
        }

        $course = Course::query()->create([
            'ulid' => (string) Str::ulid(),
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'slug' => $slug,
            'subtitle' => $validated['subtitle'] ?? null,
            'description' => $validated['description'] ?? null,
            'level' => $validated['level'] ?? null,
            'price' => $validated['price'] ?? 0,
            'currency' => $validated['currency'] ?? 'USD',
            'thumbnail' => $thumbnailUrl,
            'total_sections' => 0,
            'total_lessons' => 0,
            'total_duration_minutes' => 0,
            'has_certificate' => (bool) ($validated['certificate_enabled'] ?? false),
            'is_active' => true,
        ]);

        return redirect()
            ->route('operator.courses.curriculum', $course)
            ->with('success', 'Course created. Add modules and lessons below.');
    }

    /**
     * Step 2 (create flow) — persist modules & lessons (POST).
     */
    public function storeCurriculum(Request $request, Course $course): RedirectResponse
    {
        if ($course->user_id !== Auth::id()) {
            abort(403);
        }

        $this->validateAndReplaceCurriculumFromModules($request, $course);

        if ($request->boolean('autosave')) {
            return back();
        }

        return redirect()
            ->route('operator.courses.show', $course)
            ->with('success', 'Curriculum saved successfully.');
    }

    /**
     * Update curriculum only (PUT) — same rules as {@see storeCurriculum()}.
     */
    public function updateCurriculum(Request $request, Course $course): RedirectResponse
    {
        if ($course->user_id !== Auth::id()) {
            abort(403);
        }

        $this->validateAndReplaceCurriculumFromModules($request, $course);

        if ($request->boolean('autosave')) {
            return back();
        }

        return redirect()
            ->route('operator.courses.show', $course)
            ->with('success', 'Curriculum updated successfully.');
    }

    /**
     * Show single course (operator view).
     */
    public function show(Course $course): Response
    {
        $course = $course->load(['sections.lessons']);

        return Inertia::render('backend/Operator/Courses/Show', [
            'course' => $course,
        ]);
    }

    /**
     * Show edit course form.
     */
    public function edit(Course $course): Response
    {
        return Inertia::render('backend/Operator/Courses/creates/step1', [
            'course' => $course->load(['sections.lessons']),
        ]);
    }

    /**
     * Update course details only (wizard step 1 for edit flow).
     * Curriculum is managed via {@see updateCurriculum()}.
     */
    public function updateDetails(Request $request, Course $course): RedirectResponse
    {
        if ($course->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate(self::courseUpdateRules());

        $thumbnailUrl = null;
        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('courses/thumbnails', 'public');
            $thumbnailUrl = Storage::url($path);
        }

        DB::transaction(function () use ($course, $validated, $thumbnailUrl) {
            $nextThumbnail = $thumbnailUrl ?? $course->thumbnail;
            $shouldRemoveThumbnail = (bool) ($validated['remove_thumbnail'] ?? false);

            if ($shouldRemoveThumbnail && ! $thumbnailUrl) {
                if (is_string($course->thumbnail) && str_starts_with($course->thumbnail, '/storage/')) {
                    $relativePath = ltrim(str_replace('/storage/', '', $course->thumbnail), '/');
                    Storage::disk('public')->delete($relativePath);
                }
                $nextThumbnail = null;
            }

            $course->update([
                'title' => $validated['title'],
                'subtitle' => $validated['subtitle'] ?? null,
                'description' => $validated['description'] ?? null,
                'level' => $validated['level'] ?? null,
                'price' => $validated['price'] ?? 0,
                'currency' => $validated['currency'] ?? $course->currency,
                'has_certificate' => (bool) ($validated['certificate_enabled'] ?? false),
                'thumbnail' => $nextThumbnail,
            ]);
        });

        return redirect()
            ->route('operator.courses.curriculum', $course)
            ->with('success', 'Course details updated. You can update modules and lessons below.');
    }

    /**
     * Update course details and flat lesson list (edit form). Module-based curriculum uses {@see updateCurriculum()}.
     */
    public function update(Request $request, Course $course): RedirectResponse
    {
        dd($request->all());
        if ($course->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate(array_merge(self::courseUpdateRules(), self::flatLessonsRules()));

        $thumbnailUrl = null;
        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('courses/thumbnails', 'public');
            $thumbnailUrl = Storage::url($path);
        }

        DB::transaction(function () use ($request, $course, $validated, $thumbnailUrl) {
            $nextThumbnail = $thumbnailUrl ?? $course->thumbnail;
            $shouldRemoveThumbnail = (bool) ($validated['remove_thumbnail'] ?? false);

            if ($shouldRemoveThumbnail && ! $thumbnailUrl) {
                if (is_string($course->thumbnail) && str_starts_with($course->thumbnail, '/storage/')) {
                    $relativePath = ltrim(str_replace('/storage/', '', $course->thumbnail), '/');
                    Storage::disk('public')->delete($relativePath);
                }
                $nextThumbnail = null;
            }

            $course->update([
                'title' => $validated['title'],
                'subtitle' => $validated['subtitle'] ?? null,
                'description' => $validated['description'] ?? null,
                'level' => $validated['level'] ?? null,
                'price' => $validated['price'] ?? 0,
                'currency' => $validated['currency'] ?? $course->currency,
                'has_certificate' => (bool) ($validated['certificate_enabled'] ?? false),
                'thumbnail' => $nextThumbnail,
            ]);

            $this->replaceCourseCurriculumFromFlatLessons($course, $request, $validated['lessons'] ?? []);
        });

        return redirect()
            ->route('operator.courses.show', $course)
            ->with('success', 'Course updated successfully.');
    }

    /**
     * Delete a course.
     */
    public function destroy(Course $course): RedirectResponse
    {
        if ($course->user_id !== Auth::id()) {
            abort(403);
        }

        $course->delete();

        return Inertia::flash('success', 'Course deleted successfully.')
            ->back();
    }

    /**
     * Toggle course active status.
     */
    public function toggleActive(Course $course): RedirectResponse
    {
        if ($course->user_id !== Auth::id()) {
            abort(403);
        }

        $course->update([
            'is_active' => ! $course->is_active,
        ]);

        $status = $course->is_active ? 'activated' : 'deactivated';

        return Inertia::flash('success', "Course {$status} successfully.")
            ->back();
    }

    private function validateAndReplaceCurriculumFromModules(Request $request, Course $course): void
    {
        $validator = Validator::make($request->all(), self::modulesOnlyRules());

        $validator->after(function ($validator) use ($request) {
            $mods = $request->input('modules', []);
            if (! is_array($mods)) {
                return;
            }

            foreach (array_values($mods) as $modIdx => $module) {
                if (! is_array($module)) {
                    continue;
                }
                $lessons = $module['lessons'] ?? [];
                if (! is_array($lessons)) {
                    continue;
                }

                foreach (array_values($lessons) as $lesIdx => $lesson) {
                    if (! is_array($lesson)) {
                        continue;
                    }

                    $type = $lesson['type'] ?? null;

                    if ($type === 'video') {
                        $url = trim((string) ($lesson['video_url'] ?? ''));
                        $hasFile = $request->hasFile("modules.$modIdx.lessons.$lesIdx.video_file");
                        if ($url === '' && ! $hasFile) {
                            $validator->errors()->add("modules.$modIdx.lessons.$lesIdx.video_url", 'Provide either a video URL or upload a video file.');
                        }
                    }

                    if ($type === 'audio') {
                        $url = trim((string) ($lesson['audio_url'] ?? ''));
                        $hasFile = $request->hasFile("modules.$modIdx.lessons.$lesIdx.audio_file");
                        if ($url === '' && ! $hasFile) {
                            $validator->errors()->add("modules.$modIdx.lessons.$lesIdx.audio_url", 'Provide either an audio URL or upload an audio file.');
                        }
                    }

                    if ($type === 'pdf') {
                        $url = trim((string) ($lesson['file_url'] ?? ''));
                        $hasFile = $request->hasFile("modules.$modIdx.lessons.$lesIdx.pdf_file");
                        if ($url === '' && ! $hasFile) {
                            $validator->errors()->add("modules.$modIdx.lessons.$lesIdx.file_url", 'Provide either a PDF URL or upload a PDF file.');
                        }
                    }
                }
            }
        });

        $validated = $validator->validate();

        DB::transaction(function () use ($request, $course, $validated) {
            $this->replaceCourseCurriculumFromModules($course, $request, $validated['modules']);
        });
    }

    /**
     * @return array<string, mixed>
     */
    private static function courseStoreRules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'level' => ['required', 'string', 'in:Beginner,Intermediate,Advanced,All Levels'],
            'price' => ['required', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'max:10'],
            'thumbnail' => ['nullable', 'image', 'max:5120'],
            'certificate_enabled' => ['nullable', 'boolean'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private static function courseUpdateRules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'level' => ['nullable', 'string', 'in:Beginner,Intermediate,Advanced,All Levels'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'currency' => ['nullable', 'string', 'max:10'],
            'thumbnail' => ['nullable', 'image', 'max:5120'],
            'remove_thumbnail' => ['nullable', 'boolean'],
            'certificate_enabled' => ['nullable', 'boolean'],
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private static function flatLessonsRules(): array
    {
        return [
            'lessons' => ['nullable', 'array'],
            'lessons.*.title' => ['required', 'string', 'max:255'],
            'lessons.*.type' => ['required', 'string', 'in:video,audio,text,pdf,quiz'],
            'lessons.*.duration' => ['nullable'],
            'lessons.*.video_url' => ['nullable', 'url', 'max:500'],
            'lessons.*.audio_url' => ['nullable', 'url', 'max:500'],
            'lessons.*.file_url' => ['nullable', 'url', 'max:500'],
            'lessons.*.content' => ['nullable', 'string'],
            'lessons.*.questions' => ['nullable', 'string'],
            'lessons.*.video_file' => ['nullable', 'file', 'max:512000'],
            'lessons.*.audio_file' => ['nullable', 'file', 'max:204800'],
            'lessons.*.pdf_file' => ['nullable', 'file', 'mimetypes:application/pdf', 'max:51200'],
        ];
    }

    /**
     * Modules payload for {@see storeCurriculum()} / {@see updateCurriculum()}.
     *
     * @return array<string, mixed>
     */
    private static function modulesOnlyRules(): array
    {
        return [
            'modules' => ['present', 'array'],
            'modules.*.title' => ['required', 'string', 'max:255'],
            'modules.*.lessons' => ['nullable', 'array'],
            'modules.*.lessons.*.title' => ['required', 'string', 'max:255'],
            'modules.*.lessons.*.type' => ['required', 'string', 'in:video,audio,text,pdf,quiz'],
            'modules.*.lessons.*.duration' => ['nullable'],
            'modules.*.lessons.*.description' => ['nullable', 'string', 'max:2000'],
            'modules.*.lessons.*.video_url' => ['nullable', 'url', 'max:500'],
            'modules.*.lessons.*.audio_url' => ['nullable', 'url', 'max:500'],
            'modules.*.lessons.*.file_url' => ['nullable', 'url', 'max:500'],
            'modules.*.lessons.*.content' => ['nullable', 'string'],
            'modules.*.lessons.*.questions' => ['nullable', 'string'],
            'modules.*.lessons.*.video_file' => ['nullable', 'file', 'max:512000'],
            'modules.*.lessons.*.audio_file' => ['nullable', 'file', 'max:204800'],
            'modules.*.lessons.*.pdf_file' => ['nullable', 'file', 'mimetypes:application/pdf', 'max:51200'],
        ];
    }

    private static function normalizeDurationToMinutes(mixed $duration): int
    {
        if ($duration === null || $duration === '') {
            return 0;
        }

        if (is_string($duration) && str_contains($duration, ':')) {
            [$m, $s] = array_pad(explode(':', $duration, 2), 2, '0');
            $minutes = (int) $m;
            $seconds = (int) $s;

            return $minutes + (int) ceil($seconds / 60);
        }

        return (int) $duration;
    }

    /**
     * @param  array<int, array<string, mixed>>  $modules
     */
    private function replaceCourseCurriculumFromModules(Course $course, Request $request, array $modules): void
    {
        $course->sections()->each(fn (CourseSection $s) => $s->lessons()->delete());
        $course->sections()->delete();

        $totalLessons = 0;
        $totalMinutesAll = 0;

        foreach ($modules as $modIdx => $module) {
            $section = CourseSection::query()->create([
                'course_id' => $course->id,
                'title' => $module['title'],
                'description' => null,
                'sort_order' => $modIdx,
                'total_lessons' => 0,
                'total_duration_minutes' => 0,
            ]);

            $sectionMinutes = 0;
            $sectionLessonCount = 0;
            $lessons = $module['lessons'] ?? [];

            foreach ($lessons as $lesIdx => $lesson) {
                $minutes = self::normalizeDurationToMinutes($lesson['duration'] ?? null);
                $sectionLessonCount++;
                $totalLessons++;
                $sectionMinutes += $minutes;
                $totalMinutesAll += $minutes;

                $videoUrl = $lesson['video_url'] ?? null;
                $audioUrl = $lesson['audio_url'] ?? null;
                $fileUrl = $lesson['file_url'] ?? null;
                $content = $lesson['content'] ?? null;

                $fileBase = "modules.{$modIdx}.lessons.{$lesIdx}";
                if ($request->hasFile("{$fileBase}.video_file")) {
                    $path = $request->file("{$fileBase}.video_file")->store("courses/lessons/{$course->ulid}/videos", 'public');
                    $videoUrl = Storage::url($path);
                }
                if ($request->hasFile("{$fileBase}.audio_file")) {
                    $path = $request->file("{$fileBase}.audio_file")->store("courses/lessons/{$course->ulid}/audio", 'public');
                    $audioUrl = Storage::url($path);
                }
                if ($request->hasFile("{$fileBase}.pdf_file")) {
                    $path = $request->file("{$fileBase}.pdf_file")->store("courses/lessons/{$course->ulid}/pdfs", 'public');
                    $fileUrl = Storage::url($path);
                }

                if (($lesson['type'] ?? null) === 'quiz' && array_key_exists('questions', $lesson)) {
                    $content = $lesson['questions'];
                }

                $lessonModel = CourseLesson::query()->create([
                    'section_id' => $section->id,
                    'course_id' => $course->id,
                    'title' => $lesson['title'],
                    'description' => $lesson['description'] ?? null,
                    'lesson_type' => $lesson['type'],
                    'content' => $content,
                    'video_url' => $videoUrl,
                    'audio_url' => $audioUrl,
                    'file_url' => $fileUrl,
                    'video_duration_seconds' => $minutes > 0 ? $minutes * 60 : null,
                    'sort_order' => $lesIdx,
                ]);

                $this->syncQuizStructuresForLesson($course, $lessonModel, $content);
            }

            $section->update([
                'total_lessons' => $sectionLessonCount,
                'total_duration_minutes' => $sectionMinutes,
            ]);
        }

        $course->update([
            'total_sections' => count($modules),
            'total_lessons' => $totalLessons,
            'total_duration_minutes' => $totalMinutesAll,
        ]);
    }

    /**
     * @param  array<int, array<string, mixed>>  $lessons
     */
    private function replaceCourseCurriculumFromFlatLessons(Course $course, Request $request, array $lessons): void
    {
        $course->sections()->each(fn (CourseSection $s) => $s->lessons()->delete());
        $course->sections()->delete();

        $section = CourseSection::query()->create([
            'course_id' => $course->id,
            'title' => 'Curriculum',
            'description' => null,
            'sort_order' => 0,
            'total_lessons' => 0,
            'total_duration_minutes' => 0,
        ]);

        $totalLessons = 0;
        $totalMinutes = 0;

        foreach (array_values($lessons) as $idx => $lesson) {
            $minutes = self::normalizeDurationToMinutes($lesson['duration'] ?? null);
            $totalLessons++;
            $totalMinutes += $minutes;

            $videoUrl = $lesson['video_url'] ?? null;
            $audioUrl = $lesson['audio_url'] ?? null;
            $fileUrl = $lesson['file_url'] ?? null;
            $content = $lesson['content'] ?? null;

            if ($request->hasFile("lessons.$idx.video_file")) {
                $path = $request->file("lessons.$idx.video_file")->store("courses/lessons/{$course->ulid}/videos", 'public');
                $videoUrl = Storage::url($path);
            }
            if ($request->hasFile("lessons.$idx.audio_file")) {
                $path = $request->file("lessons.$idx.audio_file")->store("courses/lessons/{$course->ulid}/audio", 'public');
                $audioUrl = Storage::url($path);
            }
            if ($request->hasFile("lessons.$idx.pdf_file")) {
                $path = $request->file("lessons.$idx.pdf_file")->store("courses/lessons/{$course->ulid}/pdfs", 'public');
                $fileUrl = Storage::url($path);
            }

            if (($lesson['type'] ?? null) === 'quiz' && array_key_exists('questions', $lesson)) {
                $content = $lesson['questions'];
            }

            $lessonModel = CourseLesson::query()->create([
                'section_id' => $section->id,
                'course_id' => $course->id,
                'title' => $lesson['title'],
                'description' => null,
                'lesson_type' => $lesson['type'],
                'content' => $content,
                'video_url' => $videoUrl,
                'audio_url' => $audioUrl,
                'file_url' => $fileUrl,
                'video_duration_seconds' => $minutes > 0 ? $minutes * 60 : null,
                'sort_order' => $idx,
            ]);

            $this->syncQuizStructuresForLesson($course, $lessonModel, $content);
        }

        $section->update([
            'total_lessons' => $totalLessons,
            'total_duration_minutes' => $totalMinutes,
        ]);

        $course->update([
            'total_sections' => 1,
            'total_lessons' => $totalLessons,
            'total_duration_minutes' => $totalMinutes,
        ]);
    }

    /**
     * When a lesson is of type "quiz", persist structured quiz data into
     * course_quizzes, quiz_questions and quiz_question_options tables.
     *
     * The $questionsJson payload comes from the React QuestionBuilder and is
     * stored on the lesson "content" field as a JSON array of:
     * [{ id, question, options: string[], correctOption: number, explanation }]
     */
    private function syncQuizStructuresForLesson(Course $course, CourseLesson $lesson, ?string $questionsJson): void
    {
        if ($lesson->lesson_type !== 'quiz' || ! $questionsJson) {
            return;
        }

        $decoded = json_decode($questionsJson, true);
        if (! is_array($decoded) || $decoded === []) {
            return;
        }

        $now = now();

        $quizId = DB::table('course_quizzes')->insertGetId([
            'lesson_id' => $lesson->id,
            'course_id' => $course->id,
            'title' => $lesson->title,
            'description' => $lesson->description,
            'pass_percentage' => 70.00,
            'time_limit_minutes' => null,
            'max_attempts' => 3,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        foreach (array_values($decoded) as $qIndex => $question) {
            if (! is_array($question) || ! isset($question['question'])) {
                continue;
            }

            $questionId = DB::table('quiz_questions')->insertGetId([
                'quiz_id' => $quizId,
                'question' => (string) $question['question'],
                'question_type' => 'single_choice',
                'sort_order' => $qIndex,
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            $options = $question['options'] ?? [];
            $correctIndex = isset($question['correctOption']) ? (int) $question['correctOption'] : 0;

            if (is_array($options)) {
                foreach (array_values($options) as $oIndex => $optionText) {
                    DB::table('quiz_question_options')->insert([
                        'question_id' => $questionId,
                        'option_text' => (string) $optionText,
                        'is_correct' => $oIndex === $correctIndex,
                        'sort_order' => $oIndex,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);
                }
            }
        }
    }
}
