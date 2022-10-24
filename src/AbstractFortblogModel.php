<?php

namespace Fortblog;

use Illuminate\Database\Eloquent\Model;

abstract class AbstractFortblogModel extends Model
{
    /**
     * Get the current connection name for the model.
     *
     * @return string
     */
    public function getConnectionName()
    {
        return config('fortblog.database_connection');
    }
}
