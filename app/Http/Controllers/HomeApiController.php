<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeApiController extends Controller
{
    public function index(): string{
        return "hello world";
    }
}
