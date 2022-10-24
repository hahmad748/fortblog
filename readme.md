<p align="center"><img src="/art/header.png?1" alt="fortblog logo"></p>

FortBlog adds a nice UI where you can manage a publication of any size with posts, pages, tags, and authors.

You can add photos, code blocks, featured images, social media & SEO attributes, embedded HTML (YouTube Videos, Embedded Podcasts Episodes, Tweets, ...), and markdown!

Dark & Light modes available so everyone is happy 😁

## Installation

FortBlog uses a separate database connection and authentication system so that you don't have to modify any of your project code.

To install FortBlog, run these commands in the root of your Laravel app:

```sh
composer require devsfort/fortblog
php artisan fortblog:install
php artisan storage:link
```

**Configure the database connection** FortBlog is going to be using in `config/fortblog.php`. Then run:

```sh
php artisan fortblog:migrate
```

Head to `yourproject.test/fortblog` and use the provided email and password to log in.

## Uploading to S3

If you want to upload images to S3, update the `storage_disk` attribute in your `fortblog.php` configuration file to s3. Make sure your S3 disk is correctly configured in your `filesystems.php` configuration file.

```php
's3' => [
    'driver' => 's3',
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION'),
    'bucket' => env('AWS_BUCKET'),
    'url' => env('CDN_URL'),
    'options' => [
        'CacheControl' => 'public, max-age=315360000'
    ],
],
```

Note: you're going to need to install the AWS-S3 Flysystem adapter, using `composer require league/flysystem-aws-s3-v3` for this to work.

## Using Unsplash

Visit https://unsplash.com/oauth/applications to create a new unsplash app. Grab the 'Access Key' and add it to your `.env` file as `UNSPLASH_ACCESS_KEY`. Lastly, add unsplash to your `config/services.php` file:

```php
'unsplash' => [
    'key' => env('UNSPLASH_ACCESS_KEY'),
],
```

## Updates

After each update, make sure you run these commands:

```sh
php artisan fortblog:migrate
php artisan vendor:publish --tag=fortblog-assets --force
```

## Displaying your content

FortBlog is faceless, it doesn't have any opinions on how you display your content in your frontend. You can use the FortBlog models in your controllers to display the different resources:

- `Fortblog\FortblogPost`
- `Fortblog\FortblogPage`
- `Fortblog\FortblogAuthor`
- `Fortblog\FortblogTag`

To display posts and pages content, use `$post->content` instead of `$post->body`. The content will always be in HTML format while the body might be HTML or raw markdown based on the post type.

## Credits

- [Haseeb Ahmad](https://github.com/hahmad748)



## License

FortBlog is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
