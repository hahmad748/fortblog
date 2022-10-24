<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInite6bda8fe96660ef252dd0a776baaa4a7
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Fortblog\\' => 9,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Fortblog\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInite6bda8fe96660ef252dd0a776baaa4a7::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInite6bda8fe96660ef252dd0a776baaa4a7::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInite6bda8fe96660ef252dd0a776baaa4a7::$classMap;

        }, null, ClassLoader::class);
    }
}