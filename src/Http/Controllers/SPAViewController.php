<?php

namespace Fortblog\Http\Controllers;

use Fortblog\Fortblog;

class SPAViewController
{
    /**
     * Single page application catch-all route.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        return view('fortblog::layout', [
            'fortblogScriptVariables' => Fortblog::scriptVariables(),
        ]);
    }
}
