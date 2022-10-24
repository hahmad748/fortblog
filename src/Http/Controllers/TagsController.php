<?php

namespace Fortblog\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Fortblog\Http\Resources\TagsResource;
use Fortblog\FortblogTag;

class TagsController
{
    /**
     * Return posts.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection|\Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $entries = FortblogTag::when(request()->has('search'), function ($q) {
            $q->where('name', 'LIKE', '%'.request('search').'%');
        })
            ->orderBy('created_at', 'DESC')
            ->withCount('posts')
            ->paginate(30);

        return TagsResource::collection($entries);
    }

    /**
     * Return a single post.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id = null)
    {
        if ($id === 'new') {
            return response()->json([
                'entry' => FortblogTag::make([
                    'id' => Str::uuid(),
                ]),
            ]);
        }

        $entry = FortblogTag::findOrFail($id);

        return response()->json([
            'entry' => $entry,
        ]);
    }

    /**
     * Store a single category.
     *
     * @param  string  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function store($id)
    {
        $data = [
            'name' => request('name'),
            'slug' => request('slug'),
            'meta' => request('meta', (object) []),
        ];

        validator($data, [
            'name' => 'required',
            'slug' => 'required|'.Rule::unique(config('fortblog.database_connection').'.fortblog_tags', 'slug')->ignore(request('id')),
        ])->validate();

        $entry = $id !== 'new' ? FortblogTag::findOrFail($id) : new FortblogTag(['id' => request('id')]);

        $entry->fill($data);

        $entry->save();

        return response()->json([
            'entry' => $entry->fresh(),
        ]);
    }

    /**
     * Return a single tag.
     *
     * @param  string  $id
     * @return void
     */
    public function delete($id)
    {
        $entry = FortblogTag::findOrFail($id);

        $entry->delete();
    }
}
