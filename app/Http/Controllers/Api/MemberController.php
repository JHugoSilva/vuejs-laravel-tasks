<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MemberRequest;
use App\Http\Requests\MemberUpdateRequest;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MemberController extends Controller
{

    public function index(Request $request)
    {

        $param = $request->get('query');
        $members = Member::latest()->where(function ($query) use ($param) {
            if (!empty($param)) {
                $query->where('name', 'LIKE', '%' . $param . '%');
            }
        })->paginate(3);

        return response()->json([
            'data' => $members
        ], Response::HTTP_OK);
    }

    public function store(MemberRequest $request)
    {

        if ($request->validated()) {
            Member::create([
                'name' => $request->name,
                'email' => $request->email
            ]);

            return response()->json(['message' => 'Member Created'], Response::HTTP_CREATED);
        }
    }

    public function update(MemberUpdateRequest $request)
    {
        //print_r($id);exit;
        if ($request->validated()) {
            $member = Member::find($request->id);
            $member->update([
                'name' => $request->name,
                'email' => $request->email
            ]);

            return response()->json(['message' => 'Member Update'], Response::HTTP_OK);
        }
    }
}
