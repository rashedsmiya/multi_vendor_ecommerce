<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
        $this->configureInertia();
    }

    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(
            fn (): ?Password => app()->isProduction()
                ? Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->numbers()
                    ->symbols()
                    ->uncompromised()
                : null
        );
    }

    protected function configureInertia(): void
    {
        Inertia::share([
            'locale' => fn () => session('locale', config('app.locale')),
            'availableLocales' => [
                ['code' => 'en', 'native' => 'English', 'name' => 'English'],
                ['code' => 'es', 'native' => 'Español', 'name' => 'Spanish'],
                ['code' => 'fr', 'native' => 'Français', 'name' => 'French'],
            ],
        ]);
    }
}
