<?php

namespace Fortblog;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Fortblog\Http\Controllers\ForgotPasswordController;
use Fortblog\Http\Controllers\LoginController;
use Fortblog\Http\Middleware\Authenticate;

class FortblogServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any package services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerRoutes();
        $this->registerAuthGuard();
        $this->registerPublishing();

        $this->loadViewsFrom(
            __DIR__.'/../resources/views', 'fortblog'
        );
    }

    /**
     * Register the package routes.
     *
     * @return void
     */
    private function registerRoutes()
    {
        $middlewareGroup = config('fortblog.middleware_group');

        Route::middleware($middlewareGroup)
            ->as('fortblog.')
            ->domain(config('fortblog.domain'))
            ->prefix(config('fortblog.path'))
            ->group(function () {
                Route::get('/login', [LoginController::class, 'showLoginForm'])->name('auth.login');
                Route::post('/login', [LoginController::class, 'login'])->name('auth.attempt');

                Route::get('/password/forgot', [ForgotPasswordController::class, 'showResetRequestForm'])->name('password.forgot');
                Route::post('/password/forgot', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
                Route::get('/password/reset/{token}', [ForgotPasswordController::class, 'showNewPassword'])->name('password.reset');
            });

        Route::middleware([$middlewareGroup, Authenticate::class])
            ->as('fortblog.')
            ->domain(config('fortblog.domain'))
            ->prefix(config('fortblog.path'))
            ->group(function () {
                $this->loadRoutesFrom(__DIR__.'/Http/routes.php');
            });
    }

    /**
     * Register the package's authentication guard.
     *
     * @return void
     */
    private function registerAuthGuard()
    {
        $this->app['config']->set('auth.providers.fortblog_authors', [
            'driver' => 'eloquent',
            'model' => FortblogAuthor::class,
        ]);

        $this->app['config']->set('auth.guards.fortblog', [
            'driver' => 'session',
            'provider' => 'fortblog_authors',
        ]);
    }

    /**
     * Register the package's publishable resources.
     *
     * @return void
     */
    private function registerPublishing()
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__.'/../public' => public_path('vendor/fortblog'),
            ], 'fortblog-assets');

            $this->publishes([
                __DIR__.'/../config/fortblog.php' => config_path('fortblog.php'),
            ], 'fortblog-config');

            $this->publishes([
                __DIR__.'/../resources' => resource_path('fortblog'),
            ], 'fortblog-resources');
        }
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register()
    {
        $this->mergeConfigFrom(
            __DIR__.'/../config/fortblog.php', 'fortblog'
        );

        $this->commands([
            Console\InstallCommand::class,
            Console\MigrateCommand::class,
        ]);
    }
}
