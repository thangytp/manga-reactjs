<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Log;

class Chapter extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = ['mangas_id', 'chap', 'name', 'slug', 'status', 'content', 'views'];

    public function images()
    {
    	return $this->hasMany('App\Image');
    }

    public function manga()
    {
    	return $this->belongsTo('App\Manga');
    }
}
