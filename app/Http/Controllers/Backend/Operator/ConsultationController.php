<?php

namespace App\Http\Controllers\Backend\Operator;

use App\Enums\BookingStatus;
use App\Enums\ConsultationStatus;
use App\Http\Controllers\Controller;
use App\Models\Consultation;
use App\Models\ConsultationBooking;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ConsultationController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $consultations = Consultation::query()
            ->where('operator_id', $user->id)
            ->withCount('bookings')
            ->latest()
            ->get();

        $bookings = ConsultationBooking::query()
            ->whereHas('consultation', fn ($q) => $q->where('operator_id', $user->id))
            ->with(['consultation:id,title', 'client:id,first_name,last_name,email'])
            ->latest('booked_at')
            ->get();

        $stats = [
            'total_consultations' => $consultations->count(),
            'total_bookings' => $bookings->count(),
            'total_revenue' => $consultations->sum(fn ($c) => $c->price * $c->bookings_count),
        ];

        $statusCounts = [
            'all' => $bookings->count(),
            'pending' => $bookings->where('status', BookingStatus::Pending)->count(),
            'accepted' => $bookings->where('status', BookingStatus::Accepted)->count(),
            'rejected' => $bookings->where('status', BookingStatus::Rejected)->count(),
        ];

        return Inertia::render('backend/Operator/Consultations/Index', [
            'consultations' => $consultations,
            'bookings' => $bookings,
            'stats' => $stats,
            'statusCounts' => $statusCounts,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('backend/Operator/Consultations/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'category' => ['nullable', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'duration' => ['required', 'integer', 'min:15'],
            'languages' => ['nullable', 'array'],
            'languages.*' => ['string'],
            'available_days' => ['nullable', 'array'],
            'available_days.*' => ['string', Rule::in(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])],
            'start_time' => ['nullable', 'date_format:H:i'],
            'end_time' => ['nullable', 'date_format:H:i'],
            'image' => ['nullable', 'image', 'max:10240'],
        ]);

        $validated['operator_id'] = $request->user()->id;
        $validated['slug'] = Str::slug($validated['title']).'-'.Str::random(6);
        $validated['status'] = ConsultationStatus::Active;
        $validated['is_active'] = true;

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('consultations', 'public');
        }

        Consultation::create($validated);

        return redirect()
            ->route('operator.consultations.index')
            ->with('success', 'Consultation created successfully.');
    }

    public function edit(Consultation $consultation): Response
    {
        $this->authorizeOperator($consultation);

        return Inertia::render('backend/Operator/Consultations/Edit', [
            'consultation' => $consultation,
        ]);
    }

    public function update(Request $request, Consultation $consultation): RedirectResponse
    {
        $this->authorizeOperator($consultation);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'category' => ['nullable', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
            'duration' => ['required', 'integer', 'min:15'],
            'languages' => ['nullable', 'array'],
            'languages.*' => ['string'],
            'available_days' => ['nullable', 'array'],
            'available_days.*' => ['string', Rule::in(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])],
            'start_time' => ['nullable', 'date_format:H:i'],
            'end_time' => ['nullable', 'date_format:H:i'],
            'image' => ['nullable', 'image', 'max:10240'],
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('consultations', 'public');
        }

        $consultation->update($validated);

        return redirect()
            ->route('operator.consultations.index')
            ->with('success', 'Consultation updated successfully.');
    }

    public function destroy(Consultation $consultation): RedirectResponse
    {
        $this->authorizeOperator($consultation);

        $consultation->delete();

        return redirect()
            ->route('operator.consultations.index')
            ->with('success', 'Consultation deleted successfully.');
    }

    public function toggleActive(Request $request, Consultation $consultation): RedirectResponse
    {
        $this->authorizeOperator($consultation);

        $consultation->update([
            'is_active' => ! $consultation->is_active,
            'status' => $consultation->is_active ? ConsultationStatus::Inactive : ConsultationStatus::Active,
        ]);

        return back()->with('success', 'Consultation status updated.');
    }

    public function acceptBooking(ConsultationBooking $booking): RedirectResponse
    {
        $this->authorizeBooking($booking);

        $booking->update(['status' => BookingStatus::Accepted]);

        return back()->with('success', 'Booking accepted successfully.');
    }

    public function rejectBooking(Request $request, ConsultationBooking $booking): RedirectResponse
    {
        $this->authorizeBooking($booking);

        $validated = $request->validate([
            'rejection_reason' => ['required', 'string', 'max:1000'],
        ]);

        $booking->update([
            'status' => BookingStatus::Rejected,
            'rejection_reason' => $validated['rejection_reason'],
        ]);

        return back()->with('success', 'Booking rejected.');
    }

    public function rescheduleBooking(Request $request, ConsultationBooking $booking): RedirectResponse
    {
        $this->authorizeBooking($booking);

        $validated = $request->validate([
            'scheduled_at' => ['required', 'date'],
            'reason' => ['required', 'string', 'max:1000'],
        ]);

        $booking->update([
            'scheduled_at' => $validated['scheduled_at'],
        ]);

        return back()->with('success', 'Booking rescheduled successfully.');
    }

    private function authorizeOperator(Consultation $consultation): void
    {
        abort_unless($consultation->operator_id === Auth::id(), 403);
    }

    private function authorizeBooking(ConsultationBooking $booking): void
    {
        $consultation = $booking->consultation;
        abort_unless($consultation->operator_id === Auth::id(), 403);
    }
}
