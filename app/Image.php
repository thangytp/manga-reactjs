<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Image extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = ['chapter_id', 'link'];

    public function chapter()
    {
    	return $this->belongsTo('App\Chapter');
    }
}
