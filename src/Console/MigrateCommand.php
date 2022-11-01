<?php

namespace Fortblog\Console;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Fortblog\FortblogAuthor;

class MigrateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fortblog:migrate {email?} {password?}
                {--force : Force the operation to run when in production}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run database migrations for Fortblog';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $shouldCreateNewAuthor =
            ! Schema::connection(config('fortblog.database_connection'))->hasTable('fortblog_authors') ||
            ! FortblogAuthor::count();

        $this->call('migrate', [
            '--database' => config('fortblog.database_connection'),
            '--path' => 'vendor/devsfort/fortblog/src/Migrations',
            '--force' => $this->option('force') ?? true,
        ]);

        if ($shouldCreateNewAuthor) {
            $email = ! $this->argument('email') ? config('fortblog.admin_email') : $this->argument('email');
            $password = ! $this->argument('password') ? config('fortblog.admin_password') : $this->argument('password');

            FortblogAuthor::create([
                'id' => (string) Str::uuid(),
                'name' => 'John Doe',
                'slug' => 'john-doe',
                'bio' => 'This is me.',
                'email' => $email,
                'password' => Hash::make($password),
            ]);

            $this->line('');
            $this->line('');
            $this->line('Fortblog is ready for use. Enjoy!');
            $this->line('You may log in using <info>'.$email.'</info> and password: <info>'.$password.'</info>');
        }
    }
}
