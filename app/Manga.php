<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Manga extends Model
{
	use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = ['name', 'slug', 'other_name', 'status', 'description', 'views', 'cover', 'last_chapter_id'];

    public function authors()
    {
    	return $this->belongsToMany('App\Author');
    }
}
