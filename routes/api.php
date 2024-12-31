<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get("/home",[\App\Http\Controllers\HomeApiController::class,"index"])->name("home");

Route::group(['prefix'=> 'todo'] , function(){
    Route::get("/",[\App\Http\Controllers\TodoApiController::class,"index"])->name("list");
    Route::post("/",[\App\Http\Controllers\TodoApiController::class,"store"])->name("create");
    Route::put("/{id}",[\App\Http\Controllers\TodoApiController::class,"update"])->name("update");
    Route::delete("/{id}",[\App\Http\Controllers\TodoApiController::class,"delete"])->name("delete");
    Route::get("/{id}",[\App\Http\Controllers\TodoApiController::class,"detail"])->name("detail");
})->name("todo");