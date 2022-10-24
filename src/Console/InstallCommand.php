<?php

namespace Fortblog\Console;

use Illuminate\Console\Command;

class InstallCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fortblog:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install all of the Fortblog resources';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->comment('Publishing Fortblog Assets...');
        $this->callSilent('vendor:publish', ['--tag' => 'fortblog-assets']);

        $this->comment('Publishing Fortblog Configuration...');
        $this->callSilent('vendor:publish', ['--tag' => 'fortblog-config']);

        $this->comment('Publishing Resources Configuration...');
        $this->callSilent('vendor:publish', ['--tag' => 'fortblog-resources']);

        $this->info('Fortblog was installed successfully.');
    }
}
