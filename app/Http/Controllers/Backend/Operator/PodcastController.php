<?php

namespace App\Http\Controllers\Backend\Operator;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PodcastController extends Controller
{
    /**
     * List operator podcasts (Manage Podcasts).
     */
    public function index(Request $request): Response
    {
        $podcasts = $this->demoPodcasts($request->user()->id);
        $stats = [
            'total' => count($podcasts),
            'live' => (int) collect($podcasts)->where('type', 'live')->count(),
            'recorded' => (int) collect($podcasts)->where('type', 'recorded')->count(),
            'total_revenue' => 25908.35,
        ];

        return Inertia::render('backend/Operator/Podcasts/Index', [
            'podcasts' => $podcasts,
            'stats' => $stats,
        ]);
    }

    /**
     * Show create podcast form.
     */
    public function create(): Response
    {
        return Inertia::render('backend/Operator/Podcasts/Create');
    }

    /**
     * Store a new podcast.
     */
    public function store(Request $request): RedirectResponse
    {
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'type' => ['required', 'string', 'in:recorded,live'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'duration_minutes' => ['nullable', 'integer', 'min:1', 'max:999'],
            'cover_image_url' => ['nullable', 'string', 'url', 'max:2048'],
            'status' => ['nullable', 'string', 'in:draft,published'],
            'scheduled_at' => ['nullable', 'date'],
            'scheduled_time' => ['nullable', 'string', 'max:20'],
            'max_attendees' => ['nullable', 'integer', 'min:1', 'max:500'],
            'video_url' => ['nullable', 'string', 'url', 'max:2048'],
        ];

        $request->validate($rules);

        return redirect()->route('operator.podcasts.index')
            ->with('success', 'Podcast created successfully.');
    }

    /**
     * Show podcast details (operator view).
     */
    public function show(string $podcast): Response
    {
        $podcastData = $this->demoPodcastDetailsBySlug($podcast);

        return Inertia::render('backend/Operator/Podcasts/Show', [
            'podcast' => $podcastData,
        ]);
    }

    /**
     * Show edit podcast form.
     */
    public function edit(string $podcast): Response
    {
        $podcastData = $this->demoPodcastBySlug($podcast);

        return Inertia::render('backend/Operator/Podcasts/Edit', [
            'podcast' => $podcastData,
        ]);
    }

    /**
     * Update a podcast.
     */
    public function update(Request $request, string $podcast): RedirectResponse
    {
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'type' => ['required', 'string', 'in:recorded,live'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'duration_minutes' => ['nullable', 'integer', 'min:1', 'max:999'],
            'cover_image_url' => ['nullable', 'string', 'url', 'max:2048'],
            'status' => ['nullable', 'string', 'in:draft,published'],
            'scheduled_at' => ['nullable', 'date'],
            'scheduled_time' => ['nullable', 'string', 'max:20'],
            'max_attendees' => ['nullable', 'integer', 'min:1', 'max:500'],
            'video_url' => ['nullable', 'string', 'url', 'max:2048'],
        ];

        $request->validate($rules);

        return redirect()->route('operator.podcasts.index')
            ->with('success', 'Podcast updated successfully.');
    }

    /**
     * Delete a podcast.
     */
    public function destroy(string $podcast): RedirectResponse
    {
        return redirect()->route('operator.podcasts.index')
            ->with('success', 'Podcast deleted successfully.');
    }

    /**
     * Toggle published status (optional, for toggle on index).
     */
    public function togglePublished(Request $request, string $podcast): RedirectResponse
    {
        return redirect()->route('operator.podcasts.index')
            ->with('success', 'Podcast visibility updated.');
    }

    /**
     * Demo podcast list matching Figma design (replace with Eloquent when model exists).
     *
     * @return array<int, array<string, mixed>>
     */
    private function demoPodcasts(int $operatorId): array
    {
        $imagesPath = '/images/frontend/my-account/podcast';

        return [
            [
                'id' => 1,
                'slug' => 'finding-inner-peace-through-meditation',
                'title' => 'Finding Inner Peace Through Meditation',
                'description' => 'Explore techniques for achieving deep relaxation and inner peace.',
                'type' => 'recorded',
                'image' => "{$imagesPath}/mindful-eating.jpg",
                'duration_minutes' => 35,
                'plays' => 1240,
                'published_at' => '15/11/2024',
                'price' => 9.99,
                'is_published' => true,
            ],
            [
                'id' => 2,
                'slug' => 'the-power-of-reiki-energy-healing',
                'title' => 'The Power of Reiki Energy Healing',
                'description' => 'Understanding how Reiki can transform your wellbeing.',
                'type' => 'recorded',
                'image' => "{$imagesPath}/natural-remedies.jpg",
                'duration_minutes' => 42,
                'plays' => 987,
                'published_at' => '08/11/2024',
                'price' => 12.99,
                'is_published' => true,
            ],
            [
                'id' => 3,
                'slug' => 'live-qa-wellness-for-busy-professionals',
                'title' => 'Live Q&A: Wellness for Busy Professionals',
                'description' => 'Join me for a live session where we discuss practical wellness strategies.',
                'type' => 'live',
                'image' => "{$imagesPath}/podcast-hero.jpg",
                'scheduled_at' => '15/02/2025',
                'scheduled_time' => '18:00',
                'duration_minutes' => 60,
                'booked' => 23,
                'max_attendees' => 50,
                'price' => 19.99,
                'is_published' => true,
            ],
            [
                'id' => 4,
                'slug' => 'live-meditation-session-stress-relief',
                'title' => 'Live Meditation Session: Stress Relief',
                'description' => 'Interactive live meditation session focused on stress relief techniques.',
                'type' => 'live',
                'image' => "{$imagesPath}/mindful-eating.jpg",
                'scheduled_at' => '20/02/2025',
                'scheduled_time' => '19:30',
                'duration_minutes' => 45,
                'booked' => 15,
                'max_attendees' => 30,
                'price' => 15.99,
                'is_published' => true,
            ],
        ];
    }

    /**
     * Demo single podcast by slug (replace with Eloquent when model exists).
     *
     * @return array<string, mixed>
     */
    private function demoPodcastBySlug(string $slug): array
    {
        $imagesPath = '/images/frontend/my-account/podcast';
        $all = $this->demoPodcasts(0);
        foreach ($all as $p) {
            if ($p['slug'] === $slug) {
                return array_merge($p, ['slug' => $slug]);
            }
        }

        return [
            'id' => 1,
            'slug' => $slug,
            'title' => 'Finding Inner Peace Through Meditation',
            'description' => 'Explore techniques for achieving deep relaxation and inner peace.',
            'type' => 'recorded',
            'image' => "{$imagesPath}/mindful-eating.jpg",
            'duration_minutes' => 35,
            'plays' => 1240,
            'published_at' => '15/11/2024',
            'price' => 9.99,
            'is_published' => true,
        ];
    }

    /**
     * Demo podcast with details for Show page (replace with Eloquent when model exists).
     *
     * @return array<string, mixed>
     */
    private function demoPodcastDetailsBySlug(string $slug): array
    {
        $base = $this->demoPodcastBySlug($slug);
        $type = $base['type'] ?? 'recorded';

        if ($type === 'recorded') {
            return array_merge($base, [
                'video_url' => 'https://example.com/video1.mp4',
                'revenue' => 12387.60,
                'recent_viewers' => [
                    ['name' => 'Sarah Johnson', 'watched' => '35 minutes', 'purchased' => '08/02/2025'],
                    ['name' => 'Michael Chen', 'watched' => '42 minutes', 'purchased' => '07/02/2025'],
                    ['name' => 'Emma Williams', 'watched' => '28 minutes', 'purchased' => '06/02/2025'],
                ],
            ]);
        }

        return array_merge($base, [
            'scheduled_date_formatted' => 'Saturday, February 15, 2025',
            'revenue' => 459.77,
            'slots_remaining' => 27,
            'registered_attendees' => [
                ['name' => 'Sarah Johnson', 'email' => 'sarah@example.com', 'booked' => '08/02/2025', 'status' => 'confirmed'],
                ['name' => 'Michael Chen', 'email' => 'michael@example.com', 'booked' => '07/02/2025', 'status' => 'confirmed'],
                ['name' => 'Emma Williams', 'email' => 'emma@example.com', 'booked' => '06/02/2025', 'status' => 'confirmed'],
            ],
            'potential_revenue' => 999.50,
        ]);
    }
}
