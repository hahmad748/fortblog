<?php

namespace Fortblog;

class Fortblog
{
    /**
     * Get the default JavaScript variables for Fortblog.
     *
     * @return array
     */
    public static function scriptVariables()
    {
        return [
            'unsplash_key' => config('services.unsplash.key'),
            'path' => config('fortblog.path'),
            'preview_path' => config('fortblog.preview_path'),
            'author' => auth('fortblog')->check() ? auth('fortblog')->user()->only('name', 'avatar', 'id') : null,
            'default_editor' => config('fortblog.editor.default'),
        ];
    }
}
