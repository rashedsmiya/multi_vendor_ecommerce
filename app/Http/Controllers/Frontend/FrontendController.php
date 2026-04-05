<?php

namespace App\Http\Controllers\Frontend;

use App\Enums\ServiceTypeEnum;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Consultation;
use App\Models\Course;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Inertia\Inertia;
use Inertia\Response;

class FrontendController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        if ($user && $user->is_admin == true) {
            return Inertia::render('frontend/home');
        } elseif ($user) {
            return $this->HomePageAfterAuth();
        }

        return Inertia::render('frontend/home');
    }

    protected function HomePageAfterAuth(): Response
    {
        return Inertia::render('frontend/home-afer-login');
    }

    public function search(Request $request): Response
    {
        $filters = [
            'query' => trim((string) $request->input('query', '')),
            'service' => (string) $request->input('service', 'consultations'), // products|courses|consultations|podcasts
            'category' => $request->filled('category') ? (string) $request->input('category') : null, // category slug
            'max_price' => $request->filled('max_price') ? (float) $request->input('max_price') : null,
            'min_rating' => $request->filled('min_rating') ? (int) $request->input('min_rating') : null,
            'provider' => trim((string) $request->input('provider', '')),
        ];

        $perPage = (int) $request->input('per_page', 6);
        $perPage = max(6, min(24, $perPage));

        $productsQuery = Product::query()
            ->active()
            ->with(['operatorProfile:id,display_name', 'category:id,slug,name'])
            ->when($filters['query'] !== '', function ($q) use ($filters) {
                $q->where(function ($qq) use ($filters) {
                    $qq->where('title', 'like', "%{$filters['query']}%")
                        ->orWhere('description', 'like', "%{$filters['query']}%");
                });
            })
            ->when($filters['category'], fn ($q) => $q->whereHas('category', fn ($cq) => $cq->where('slug', $filters['category'])))
            ->when($filters['max_price'], fn ($q) => $q->where('price', '<=', $filters['max_price']))
            ->when($filters['min_rating'], fn ($q) => $q->where('average_rating', '>=', $filters['min_rating']))
            ->when($filters['provider'] !== '', fn ($q) => $q->whereHas('operatorProfile', fn ($op) => $op->where('display_name', 'like', "%{$filters['provider']}%")));

        $coursesQuery = Course::query()
            ->where('is_active', true)
            ->with(['user:id,first_name,last_name', 'category:id,slug,name'])
            ->when($filters['query'] !== '', function ($q) use ($filters) {
                $q->where(function ($qq) use ($filters) {
                    $qq->where('title', 'like', "%{$filters['query']}%")
                        ->orWhere('description', 'like', "%{$filters['query']}%");
                });
            })
            ->when($filters['category'], fn ($q) => $q->whereHas('category', fn ($cq) => $cq->where('slug', $filters['category'])))
            ->when($filters['max_price'], fn ($q) => $q->where('price', '<=', $filters['max_price']))
            ->when($filters['min_rating'], fn ($q) => $q->where('average_rating', '>=', $filters['min_rating']))
            ->when($filters['provider'] !== '', fn ($q) => $q->whereHas('user', fn ($u) => $u->where('name', 'like', "%{$filters['provider']}%")));

        $consultationsQuery = Consultation::query()
            ->where('is_active', true)
            ->with(['operator:id,name'])
            ->when($filters['query'] !== '', function ($q) use ($filters) {
                $q->where(function ($qq) use ($filters) {
                    $qq->where('title', 'like', "%{$filters['query']}%")
                        ->orWhere('description', 'like', "%{$filters['query']}%");
                });
            })
            ->when($filters['max_price'], fn ($q) => $q->where('price', '<=', $filters['max_price']))
            ->when($filters['provider'] !== '', fn ($q) => $q->whereHas('operator', fn ($u) => $u->where('name', 'like', "%{$filters['provider']}%")));

        $items = collect();

        $service = $filters['service'];
        $service = in_array($service, ['products', 'courses', 'consultations', 'podcasts'], true) ? $service : 'consultations';
        $filters['service'] = $service;

        if ($service === 'products') {
            $items = $items->concat(
                $productsQuery->get()->map(function (Product $p) {
                    return [
                        'kind' => 'Product',
                        'id' => $p->id,
                        'title' => $p->title,
                        'provider' => $p->operatorProfile?->display_name ?? null,
                        'price' => (float) $p->price,
                        'currency' => $p->currency,
                        'rating' => (float) $p->average_rating,
                        'image_url' => $p->primary_image_url,
                        'category' => $p->category?->name,
                        'slug' => $p->slug,
                    ];
                })
            );
        }

        if ($service === 'courses') {
            $items = $items->concat(
                $coursesQuery->get()->map(function (Course $c) {
                    return [
                        'kind' => 'Course',
                        'id' => $c->id,
                        'title' => $c->title,
                        'provider' => $c->user?->first_name ?? null,
                        'price' => (float) ($c->is_free ? 0 : $c->price),
                        'currency' => $c->currency,
                        'rating' => (float) $c->average_rating,
                        'image_url' => $c->thumbnail ?: 'https://placehold.co/800x600?text=Course',
                        'category' => $c->category?->name,
                    ];
                })
            );
        }

        if ($service === 'consultations') {
            $items = $items->concat(
                $consultationsQuery->get()->map(function (Consultation $c) {
                    return [
                        'kind' => 'Consultation',
                        'id' => $c->id,
                        'title' => $c->title,
                        'provider' => $c->operator?->name ?? null,
                        'price' => (float) $c->price,
                        'currency' => 'EUR',
                        'rating' => null,
                        'image_url' => $c->image ?: 'https://placehold.co/800x600?text=Consultation',
                        'category' => $c->category,
                    ];
                })
            );
        }

        $items = $items
            ->sortBy(fn ($i) => strtolower((string) $i['title']))
            ->values();

        $page = LengthAwarePaginator::resolveCurrentPage();
        $slice = $items->forPage($page, $perPage)->values();
        $results = new LengthAwarePaginator(
            $slice,
            $items->count(),
            $perPage,
            $page,
            [
                'path' => $request->url(),
                'query' => $request->query(),
            ],
        );

        $categoriesByService = [
            'products' => Category::query()->active()->where('type', ServiceTypeEnum::PRODUCT->value)->orderBy('sort_order')->get(['id', 'name', 'slug']),
            'courses' => Category::query()->active()->where('type', ServiceTypeEnum::COURSE->value)->orderBy('sort_order')->get(['id', 'name', 'slug']),
            'consultations' => Category::query()->active()->where('type', ServiceTypeEnum::CONSULTATION->value)->orderBy('sort_order')->get(['id', 'name', 'slug']),
        ];

        return Inertia::render('frontend/search', [
            'results' => $results,
            'filters' => $filters,
            'categoriesByService' => $categoriesByService,
        ]);
    }
}
