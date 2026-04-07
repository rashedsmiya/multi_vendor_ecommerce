<?php

namespace App\Http\Controllers\Backend\Operator;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WalletEarningsController extends Controller
{
    /**
     * List Wallet & Earnings (balance, earnings by type, transactions).
     */
    public function index(Request $request): Response
    {
        return Inertia::render('backend/Operator/WalletEarnings/Index', [
            'available_balance' => 12450.75,
            'pending_balance' => 1850.50,
            'total_earnings' => 45680.25,
            'earnings_by_service' => [
                ['label' => 'Consultations', 'amount' => 18500.00, 'percent' => '40.5'],
                ['label' => 'Courses', 'amount' => 15200.50, 'percent' => '33.3'],
                ['label' => 'Products', 'amount' => 8430.25, 'percent' => '18.5'],
                ['label' => 'Podcasts', 'amount' => 3549.50, 'percent' => '7.8'],
            ],
            'transactions' => [
                ['title' => 'Business Strategy Session', 'subtitle' => '1-on-1 Consultation', 'date' => '2026-02-08', 'amount' => 150.00, 'type' => 'in', 'status' => 'completed'],
                ['title' => 'Digital Marketing Mastery', 'subtitle' => 'Course Purchase', 'date' => '2026-02-07', 'amount' => 299.00, 'type' => 'in', 'status' => 'completed'],
                ['title' => 'Live Podcast Session', 'subtitle' => 'Podcast Booking', 'date' => '2026-02-06', 'amount' => 49.99, 'type' => 'in', 'status' => 'completed'],
                ['title' => 'Business Templates Bundle', 'subtitle' => 'Digital Product', 'date' => '2026-02-06', 'amount' => 89.00, 'type' => 'in', 'status' => 'pending'],
                ['title' => 'Bank Transfer (Withdrawal)', 'subtitle' => 'Withdrawal', 'date' => '2026-02-05', 'amount' => 500.00, 'type' => 'out', 'status' => 'processing'],
                ['title' => 'SEO Fundamentals', 'subtitle' => 'Course Purchase', 'date' => '2026-02-04', 'amount' => 199.00, 'type' => 'in', 'status' => 'completed'],
            ],
        ]);
    }

    /**
     * Redirect to Create Method (Payment Methods) page.
     */
    public function create(): RedirectResponse
    {
        return redirect()->route('operator.withdraws.create-method');
    }

    /**
     * Show Create Method page (Payment Methods list + Add opens modal).
     */
    public function createMethod(): Response
    {
        return Inertia::render('backend/Operator/WalletEarnings/CreateWithdrawMethod', [
            'payment_methods' => $this->demoPaymentMethods(),
        ]);
    }

    /**
     * Delete a payment method (stub: redirect back; replace with Eloquent when model exists).
     */
    public function destroyPaymentMethod(string $paymentMethod): RedirectResponse
    {
        return redirect()->route('operator.withdraws.create-method')
            ->with('success', 'Payment method removed.');
    }

    /**
     * Store a new withdrawal request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'amount' => ['required', 'numeric', 'min:1'],
            'method' => ['required', 'string', 'in:bank_transfer,paypal,wise'],
            'note' => ['nullable', 'string', 'max:500'],
        ]);

        return redirect()->route('operator.withdraws.index')
            ->with('success', 'Withdrawal request submitted successfully.');
    }

    /**
     * Delete/cancel a withdrawal request.
     */
    public function destroy(string $withdraw): RedirectResponse
    {
        return redirect()->route('operator.withdraws.index')
            ->with('success', 'Withdrawal request cancelled.');
    }

    /**
     * Demo payment methods list (replace with Eloquent when model exists).
     *
     * @return array<int, array<string, mixed>>
     */
    private function demoPaymentMethods(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'Chase Business Account',
                'icon_type' => 'bank',
                'is_default' => true,
                'is_verified' => true,
                'detail' => 'Chase Bank • Checking',
                'masked' => 'Account ending in ••••4567',
                'added_at' => 'January 15, 2026',
            ],
            [
                'id' => 2,
                'title' => 'Stripe Account',
                'icon_type' => 'stripe',
                'is_default' => false,
                'is_verified' => true,
                'detail' => 'Connected to receive instant payouts',
                'masked' => null,
                'added_at' => 'December 10, 2025',
            ],
            [
                'id' => 3,
                'title' => 'Visa ending in 8901',
                'icon_type' => 'card',
                'is_default' => false,
                'is_verified' => false,
                'detail' => 'Card ending in ••••8901',
                'masked' => null,
                'added_at' => 'February 1, 2026',
            ],
        ];
    }
}
