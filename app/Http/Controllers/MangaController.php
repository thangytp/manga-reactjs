<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Manga;
use Log;

class MangaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mangas = Manga::all();
        return response()->json($mangas);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        Log::info('im in create');
        return response('Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
        Log::info('im in store');
        $manga = new Manga();
        $manga->name = $request->get('name');
        $manga->slug = $request->get('slug');
        $manga->other_name = $request->get('other_name');
        $manga->status = $request->get('status');
        $manga->description = $request->get('description');
        $manga->cover = $request->get('cover');
        $manga->save();
        return response()->json([
                                    'message'=>'Manga added successfully',
                                    'code'=>200
                                ]);
        } catch (\Exception $e){
            if(request()->isJson()){
                return response()->json([
                                            'message'=>'Something went wrong! Try later',
                                            'code'=>500]
                                );
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            Log::info('im in show');
            $manga = Manga::find($id);
            if($manga){
                if(request()->isJson()){
                    return response()->json([
                        'message'=>'Get manga successfully',
                        'code'=> 200,
                        'data' => $manga
                    ]);
                }
                return response()->json([
                        'message'=>'Get manga successfully',
                        'code'=> 200,
                        'data' => $manga
                    ]);
            } else {
                if(request()->isJson()){
                    return response()->json([
                        'message'=>'Manga is not found',
                        'code'=>404
                    ]);
                }
                return response()->json([
                    'message'=>'Manga is not found',
                    'code'=>404
                ]);
            }

        } catch (\Exception $e){
            if(request()->isJson()){
                return response()->json([
                                            'message'=>'Something went wrong! Try later',
                                            'code'=>500]
                                );
            }
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
