<?php

namespace App\Http\Controllers\Api;

use App\Events\NewProjectCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectPinnedRequest;
use App\Http\Requests\ProjectRequest;
use App\Http\Requests\ProjectUpdateRequest;
use App\Models\Member;
use App\Models\Project;
use App\Models\Task;
use App\Models\TaskProgress;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{

    public function index(Request $request)
    {

        $param = $request->get('query');

        $projects = Project::latest()->with(['task_progress'])->where(function ($query) use ($param) {
            if (!empty($param)) {
                //print_r($param);exit;
                $query->where('name', 'LIKE', '%' . $param . '%');
            }
        })->paginate(3);

        return response()->json([
            'data' => $projects
        ], Response::HTTP_OK);
    }

    public function store(ProjectRequest $request)
    {
        if ($request->validated()) {

            return DB::transaction(function () use ($request) {
                $project = Project::create([
                    'name' => $request->name,
                    'startDate' => $request->startDate,
                    'endDate' => $request->endDate,
                    'status' => Project::NOT_STARTED,
                    'slug' => Project::createSlug($request->name)
                ]);


                TaskProgress::create([
                    'projectId' => $project->id,
                    'pinned_on_dashboard' => TaskProgress::NOT_PINNED_ON_DASHBOARD,
                    'progress' => TaskProgress::INITIAL_PROJECT_PERCENT
                ]);

                $count = Project::count();

                NewProjectCreated::dispatch($count);


                return response()->json(['message' => 'Project Created'], Response::HTTP_CREATED);
            });
        }
    }

    public function update(ProjectUpdateRequest $request)
    {

        if ($request->validated()) {
            $project = Project::find($request->id);

            $project->update([
                'name' => $request->name,
                'startDate' => $request->startDate,
                'endDate' => $request->endDate,
                'slug' => Project::createSlug($request->name)
            ]);
        }

        return response()->json(['message' => 'Project Updated'], Response::HTTP_OK);
    }

    public function show($slug)
    {
        $project = Project::with(['tasks.task_members.members', 'task_progress'])->where('projects.slug', $slug)->first();
        return response()->json([
            'data' => $project
        ], Response::HTTP_OK);
    }

    public function pinnedProject(ProjectPinnedRequest $request)
    {

        if ($request->validated()) {
            return DB::transaction(function () use ($request) {
                TaskProgress::where('pinned_on_dashboard', TaskProgress::PINNED_ON_DASHBOARD)
                    ->update(['pinned_on_dashboard' => TaskProgress::NOT_PINNED_ON_DASHBOARD]);
                TaskProgress::where('projectId', $request->projectId)->update([
                    'pinned_on_dashboard' => TaskProgress::PINNED_ON_DASHBOARD
                ]);

                return response()->json(['message' => 'Project Pinned On Dashboard']);
            });
        }
    }

    public function countProject()
    {
        $count = Project::count();
        return response()->json(['count' => $count], Response::HTTP_OK);
    }

    public function getPinnedProject(Request $request)
    {

        $project = TaskProgress::join('projects', 'task_progress.projectId', 'projects.id')
            ->select('projects.id', 'projects.name')
            ->where('task_progress.pinned_on_dashboard', TaskProgress::PINNED_ON_DASHBOARD)
            ->first();

        if (!is_null($project)) {
            return response()->json(['data' => $project], Response::HTTP_OK);
        }
        return response()->json(['data' => ''], Response::HTTP_OK);
    }

    public function getProjectChartData(Request $request) {

        $projectId = $request->projectId;

        $taskProgress = TaskProgress::where('projectId', $projectId)
        ->select('progress')
        ->first();

        $taskArray = Task::countCompletedAndPendingTask($projectId);

        return response()->json([
            'tasks' => $taskArray,
            'progress' => intval($taskProgress->progress)
        ], Response::HTTP_OK);
    }
}
