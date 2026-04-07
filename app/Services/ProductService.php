<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductService
{
    public function paginateForOperator(int $perPage = 15): LengthAwarePaginator
    {
        return Product::query()
            ->whereHas('operatorProfile', fn ($q) => $q->where('user_id', Auth::id()))
            ->with(['category:id,name', 'images:id,product_id,image_url,is_primary,sort_order'])
            ->latest()
            ->paginate($perPage);
    }

    public function activeProductCategories(): Collection
    {
        return Category::query()
            ->where('is_active', true)
            ->where('type', 'product')
            ->orderBy('sort_order')
            ->get(['id', 'name']);
    }

    public function findForOperatorOrFail(int $id): Product
    {
        return Product::query()
            ->whereHas('operatorProfile', fn ($q) => $q->where('user_id', Auth::id()))
            ->findOrFail($id);
    }

    public function productDetailsPayload(Product $product): array
    {
        return [
            'id' => $product->id,
            'title' => $product->title,
            'description' => $product->description,
            'price' => $product->price,
            'currency' => $product->currency,
            'product_type' => $product->product_type,
            'stock_quantity' => $product->stock_quantity,
            'sku' => $product->sku,
            'weight' => $product->weight,
            'dimensions' => $product->dimensions,
            'is_active' => $product->is_active,
            'category' => $product->category,
            'images' => $product->images,
        ];
    }

    public function productFormPayload(Product $product): array
    {
        return [
            'id' => $product->id,
            'title' => $product->title,
            'description' => $product->description,
            'price' => $product->price,
            'currency' => $product->currency,
            'product_type' => $product->product_type,
            'stock_quantity' => $product->stock_quantity,
            'sku' => $product->sku,
            'weight' => $product->weight,
            'dimensions' => $product->dimensions,
            'is_active' => $product->is_active,
            'category_id' => $product->category_id,
            'existing_image_ids' => $product->images->pluck('id')->toArray(),
            'images' => $product->images,
        ];
    }

    public function buildValidatedPayload(array $validated, array $extra = []): array
    {
        $payload = array_merge($validated, $extra);
        unset($payload['images'], $payload['existing_image_ids']);

        if (isset($payload['title'])) {
            $payload['slug'] = Str::slug($payload['title']);
        }

        return $payload;
    }

    public function createForOperatorProfile(int $operatorProfileId, array $payload): Product
    {
        return Product::query()->create(array_merge($payload, [
            'operator_profile_id' => $operatorProfileId,
        ]));
    }

    public function updateForOperator(Product $product, array $payload): void
    {
        $product->update($payload);
    }

    public function toggleActive(Product $product): void
    {
        $product->update(['is_active' => ! $product->is_active]);
    }

    /**
     * @param  array<int, \Illuminate\Http\UploadedFile>  $newFiles
     * @param  array<int, int>|null  $existingIds
     */
    public function syncImages(Product $product, array $newFiles, ?array $existingIds): void
    {
        // Delete images not in the kept list
        if ($existingIds !== null) {
            $product->images()
                ->whereNotIn('id', $existingIds)
                ->each(function (ProductImage $img) {
                    $this->deleteImageFile($img->image_url);
                    $img->delete();
                });
        }

        foreach ($newFiles as $index => $file) {
            $path = $file->store("products/{$product->id}/images", 'public');
            $url = Storage::url($path);

            $isPrimary = $product->images()->count() === 0 && $index === 0;

            $product->images()->create([
                'image_url' => $url,
                'is_primary' => $isPrimary,
                'sort_order' => $product->images()->max('sort_order') + $index + 1,
            ]);
        }

        // Ensure at least one primary image
        if ($product->images()->where('is_primary', true)->doesntExist()) {
            $product->images()->oldest()->first()?->update(['is_primary' => true]);
        }
    }

    private function deleteImageFile(string $url): void
    {
        $relative = ltrim(str_replace('/storage/', '', $url), '/');
        Storage::disk('public')->delete($relative);
    }
}
