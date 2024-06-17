<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::controller(AuthController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::get('validate_email/{token}', 'validEmail');
});

Route::middleware('auth:sanctum')->group(function(){

    Route::controller(AuthController::class)->group(function(){
        Route::get('validate_email/{token}', 'validEmail');
        Route::post('logout', 'logout');
    });

    Route::controller(ProjectController::class)->group(function(){
        Route::get('projects', 'index');
        Route::post('project', 'store');
        Route::post('project_update', 'update');
        Route::get('project/{slug}', 'show');
        Route::post('pinned_project', 'pinnedProject');
        Route::get('count_project', 'countProject');
        Route::get('get_pinned_project', 'getPinnedProject');
        Route::get('chart-data/projects', 'getProjectChartData');
    });

    Route::controller(MemberController::class)->group(function(){
        Route::get('members', 'index');
        Route::post('member', 'store');
        Route::post('member', 'update');
    });

    Route::controller(TaskController::class)->group(function(){
        Route::post('task', 'store');
        Route::post('tasks/not_started_to_pending', 'TaskToNotStartedToPending');
        Route::post('tasks/pending_to_completed', 'TaskNotStartedToCompleted');
        Route::post('tasks/completed_to_pending', 'TaskToCompletedToPending');
    });
});

