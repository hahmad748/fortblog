<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Fortblog Database Connection
    |--------------------------------------------------------------------------
    |
    | This is the database connection you want Fortblog to use while storing &
    | reading your content. By default Fortblog assumes you've prepared a
    | new connection called "Fortblog". However, you can change that
    | to anything you want.
    |
    */

    'database_connection' => env('Fortblog_DB_CONNECTION', 'fortblog'),

    /*
    |--------------------------------------------------------------------------
    | Fortblog Uploads Disk
    |--------------------------------------------------------------------------
    |
    | This is the storage disk Fortblog will use to put file uploads, you can use
    | any of the disks defined in your config/filesystems.php file. You may
    | also configure the path where the files should be stored.
    |
    */

    'storage_disk' => env('Fortblog_STORAGE_DISK', 'local'),

    'storage_path' => env('Fortblog_STORAGE_PATH', 'public/fortblog/images'),

    /*
    |--------------------------------------------------------------------------
    | Fortblog Domain
    |--------------------------------------------------------------------------
    |
    | This is the subdomain where Fortblog will be accessible from. By default it
    | will be accessible on the same domain as your app.
    |
    */

    'domain' => env('Fortblog_DOMAIN'),

    /*
    |--------------------------------------------------------------------------
    | Fortblog Path
    |--------------------------------------------------------------------------
    |
    | This is the URI prefix where Fortblog will be accessible from. Feel free to
    | change this path to anything you like.
    |
    */

    'path' => env('Fortblog_PATH', 'fortblog'),

    /*
    |--------------------------------------------------------------------------
    | Fortblog Middleware Group
    |--------------------------------------------------------------------------
    |
    | This is the middleware group that Fortblog uses.
    |
    */

    'middleware_group' => env('Fortblog_MIDDLEWARE_GROUP', 'web'),

    /*
    |--------------------------------------------------------------------------
    | Fortblog Post Preview Path
    |--------------------------------------------------------------------------
    |
    | Fortblog uses this path to display a preview link in the editor. While
    | building the link tag, the {postSlug} placeholder will be replaced
    | by the actual post slug.
    |
    */

    'preview_path' => '/{postSlug}',

    'editor' => [

        /*
        |--------------------------------------------------------------------------
        | Default editor (for when you don't want options)
        |--------------------------------------------------------------------------
        |
        | Fortblog usually allows either markdown or rich text editing. If you're
        | setting up an environment where you only want one or the other
        | you can specify that here. (options: null, 'markdown', 'rich')
        |
        */

        'default' => null,

    ],
];
