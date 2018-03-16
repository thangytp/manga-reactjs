<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Manga;
use App\Chapter;
use Illuminate\Support\Facades\DB;
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
        return response()->json([
            'code' => 200,
            'message' => 'Success',
            'data' => $mangas
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        Log::info('im in create view');
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
        Log::info('im in store - save to db');
        $manga = Manga::where('name', $request->get('name'))->first();
        Log::info($manga);
        die();
        $manga = new Manga;
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
            Log::info($e->getMessage());
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
                $chapters = Chapter::where('manga_id', $manga->id)->orderBy('chap', 'ASC')->get();
                // $chapters = DB::table('mangas')->where('mangas.id', 5)->leftJoin('chapters', 'mangas.id', '=', 'chapters.manga_id')->select('mangas.*', 'chapters.name')->get();
                return response()->json([
                        'message'=>'Get manga successfully',
                        'code'=> 200,
                        'data' => ['manga' => $manga, 'chapters' => $chapters]
                    ]);
            } else {
                return response()->json([
                    'message'=>'Manga is not found',
                    'code'=>404
                ]);
            }

        } catch (\Exception $e){
            Log::info($e);
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
        Log::info('im in update manga');
        try{
            $manga = Manga::find($id);
            if(!$manga) {
                return response()->json([
                                'message'=>'Manga not found',
                                'code'=>404]
                    );
            }
            $manga->name = $request->get('name');
            $manga->slug = $request->get('slug');
            $manga->other_name = $request->get('other_name');
            $manga->status = $request->get('status');
            $manga->description = $request->get('description');
            $manga->cover = $request->get('cover');
            $manga->save();
            return response()->json([
                                    'message'=>'Manga updated successfully',
                                    'code'=>200
                                ]);
        } catch (\Exception $e){
            Log::info($e);
            return response()->json([
                                        'message'=>'Something went wrong! Try later',
                                        'code'=>500]
                            );
        }
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
