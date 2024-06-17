<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskRequest;
use App\Models\Task;
use App\Models\TaskMember;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{

    public function store(TaskRequest $request)
    {

        if ($request->validated()) {

            return DB::transaction(function () use ($request) {

                $task = Task::create([
                    'name' => $request->name,
                    'projectId' => $request->projectId,
                    'status' => Task::NOT_STARTED
                ]);

                $members = $request->memberIds;

                for ($i = 0; $i < count($members); $i++) {

                    TaskMember::create([
                        'projectId' => $request->projectId,
                        'taskId' => $task->id,
                        'memberId' => $members[$i]
                    ]);
                }

                return response()->json(['message' => 'Task Created Successfully !'], Response::HTTP_CREATED);
            });
        }
    }

    public function TaskToNotStartedToPending(Request $request)
    {
        Task::changeTaskStatus($request->taskId, Task::PENDING);
        Task::handleProjectProgress($request->projectId);
        return response()->json(['message' => 'Task move to Pending Successfully !'], Response::HTTP_OK);
    }

    public function TaskNotStartedToCompleted(Request $request)
    {
        Task::changeTaskStatus($request->taskId, Task::COMPLETED);
        return response()->json(['message' => 'Task move to Completed Successfully !'], Response::HTTP_OK);
    }

    public function TaskToPendingToNotStarted(Request $request)
    {
        Task::changeTaskStatus($request->taskId, Task::NOT_STARTED);
        return response()->json(['message' => 'Task move to Not Started Successfully !'], Response::HTTP_OK);
    }

    public function TaskToCompletedToPending(Request $request)
    {
        Task::changeTaskStatus($request->taskId, Task::PENDING);
        Task::handleProjectProgress($request->projectId);
        return response()->json(['message' => 'Task move to Pending Started Successfully !'], Response::HTTP_OK);
    }

    public function TaskToCompletedToNoStarted(Request $request)
    {
        Task::changeTaskStatus($request->taskId, Task::NOT_STARTED);
        return response()->json(['message' => 'Task move to Not Started Successfully !'], Response::HTTP_OK);
    }
}
