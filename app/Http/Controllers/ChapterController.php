<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Chapter;
use Log;

class ChapterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
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
            $chapter = new Chapter;
            $chapter->manga_id = $request->get('manga_id');
            $chapter->chap = $request->get('chap');
            $chapter->name = $request->get('name');
            $chapter->slug = $request->get('slug');
            $chapter->status = $request->get('status');
            $chapter->content = $request->get('content');

            $chapter->save();
            return response()->json([
                                    'message'=>'Chapter added successfully',
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            Log::info('im in show');
            $chapter = Chapter::find($id);

            if($chapter){
                return response()->json([
                        'message'=>'Get chapter successfully',
                        'code'=> 200,
                        'data' => $chapter
                    ]);
            } else {
                return response()->json([
                    'message'=>'Chapter is not found',
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
        Log::info('im in update');
        try{
            $chapter = Chapter::find($id);
            if(!$chapter) {
                return response()->json([
                                'message'=>'Chapter not found',
                                'code'=>404]
                    );
            }
            $chapter->manga_id = $request->get('manga_id');
            $chapter->chap = $request->get('chap');
            $chapter->name = $request->get('name');
            $chapter->slug = $request->get('slug');
            $chapter->status = $request->get('status');
            $chapter->content = $request->get('content');
            $chapter->save();
            return response()->json([
                                    'message'=>'Chapter updated successfully',
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
