<?php

namespace App\Http\Controllers;

use App\Http\Requests\TodoCreateRequest;
use App\ViewModel\ResponseModel;
use App\Models\Todo;

class TodoApiController extends Controller
{
    public function index(){
        $todo = Todo::all();
        return response()->json(ResponseModel::of(200,"success",$todo));
    }

    public function detail(string $id){
        $todo = Todo::find($id);
        return response()->json(ResponseModel::of(200,"success",$todo));
    }
    
    public function store(TodoCreateRequest $request){
        $filledData = $request->validated();
        $t = Todo::create($filledData);
        return response()->json(ResponseModel::of(200,"success",$t));
    }

    public function update(string $id,TodoCreateRequest $request){
        $filledData = $request->validated();
        $temp = Todo::find($id);
        if($temp != null){
            $temp->task = $filledData['task'];
            $temp->description = $filledData['description'];
            $temp->save();
            return response()->json(ResponseModel::of(200,"success",$temp));
        }
        return response()->json(ResponseModel::of(200,"update not successfully",null));
    }

    public function delete(string $id){
        $temp = Todo::find($id);
        if($temp != null){
            $temp->delete();
            return response()->json(ResponseModel::of(200,"success","true"));
        }
        return response()->json(ResponseModel::of(400,"already deleted","false"));
    }
}
