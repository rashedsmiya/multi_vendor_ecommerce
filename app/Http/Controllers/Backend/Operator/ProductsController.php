<?php

namespace App\Http\Controllers\Backend\Operator;

use App\Enums\ProductTypeEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Operator\ProductRequest;
use App\Services\ProductService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductsController extends Controller
{
    public function __construct(
        private readonly ProductService $products,
    ) {}

    public function products(): Response
    {
        $products = $this->products->paginateForOperator(6);

        return Inertia::render('backend/Operator/Products/index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        $categories = $this->products->activeProductCategories();

        return Inertia::render('backend/Operator/Products/form', [
            'categories' => $categories,
            'productTypes' => collect(ProductTypeEnum::cases())->map(fn (ProductTypeEnum $e) => [
                'value' => $e->value,
                'label' => $e->label(),
            ])->values(),
        ]);
    }

    public function show(int $id): Response
    {
        $product = $this->products
            ->findForOperatorOrFail($id)
            ->load([
                'category:id,name',
                'images:id,product_id,image_url,is_primary,sort_order',
            ]);

        return Inertia::render('backend/Operator/Products/details', [
            'product' => $this->products->productDetailsPayload($product),
        ]);
    }

    public function edit(int $id): Response
    {
        $product = $this->products->findForOperatorOrFail($id);
        $categories = $this->products->activeProductCategories();

        return Inertia::render('backend/Operator/Products/form', [
            'productId' => $id,
            'product' => $this->products->productFormPayload($product),
            'categories' => $categories,
            'productTypes' => collect(ProductTypeEnum::cases())->map(fn (ProductTypeEnum $e) => [
                'value' => $e->value,
                'label' => $e->label(),
            ])->values(),
        ]);
    }

    public function store(ProductRequest $request): RedirectResponse
    {
        $user = $request->user();
        $operatorProfileId = $user?->operatorProfile?->id;

        if (! $operatorProfileId) {
            return back()->with('error', 'Operator profile not found');
        }

        $validated = $request->validated();

        $payload = $this->products->buildValidatedPayload($validated, $request->only([
            'dimensions',
        ]));

        $product = $this->products->createForOperatorProfile($operatorProfileId, $payload);
        $this->products->syncImages($product, $request->file('images', []), []);

        return redirect()
            ->route('operator.products.index')
            ->with('success', 'Product created successfully');
    }

    public function update(ProductRequest $request, int $id): RedirectResponse
    {
        $product = $this->products->findForOperatorOrFail($id);

        $validated = $request->validated();

        $payload = $this->products->buildValidatedPayload($validated, $request->only([
            'dimensions',
        ]));

        $this->products->updateForOperator($product, $payload);
        $this->products->syncImages(
            $product,
            $request->file('images', []),
            $request->input('existing_image_ids')
        );

        return redirect()
            ->route('operator.products.index')
            ->with('success', 'Product updated successfully');
    }

    public function switchStatus(int $id): RedirectResponse
    {
        // Fixed: Inertia::back() does not exist — use redirect()->back()
        $product = $this->products->findForOperatorOrFail($id);
        $this->products->toggleActive($product);

        return redirect()->back()->with('success', 'Product status updated successfully');
    }

    public function destroy(int $id): RedirectResponse
    {
        $product = $this->products->findForOperatorOrFail($id);
        $product->delete();

        return redirect()
            ->route('operator.products.index')
            ->with('success', 'Product deleted successfully');
    }
}
