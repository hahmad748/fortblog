<?php

namespace Fortblog\Http\Controllers;

use Illuminate\Support\Facades\Storage;

class ImageUploadsController
{
    /**
     * Upload a new image.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload()
    {
        $path = request()->image->store(config('fortblog.storage_path'), [
            'disk' => config('fortblog.storage_disk'),
            'visibility' => 'public',
        ]
        );

        return response()->json([
            'url' => Storage::disk(config('fortblog.storage_disk'))->url($path),
        ]);
    }
}
