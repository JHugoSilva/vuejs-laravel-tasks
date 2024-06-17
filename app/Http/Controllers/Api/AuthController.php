<?php

namespace App\Http\Controllers\Api;

use App\Events\NewUserCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;

class AuthController extends Controller
{

    public function register(AuthRequest $request)
    {

        $user = User::create($request->getData());

        NewUserCreated::dispatch($user);

        return response()->json([
            'message' => 'Created'
        ], Response::HTTP_CREATED);
    }

    public function login(LoginRequest $request)
    {

        if ($request->validated()) {

            $user = User::whereEmail($request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Credentials Not Match.'
                ], Response::HTTP_UNAUTHORIZED);
            }

            if (intval($user->isValidEmail) !== User::IS_VALID_EMAIL) {
                NewUserCreated::dispatch($user);
                return response()->json([
                    'message' => 'Email Not Checked.'
                ], Response::HTTP_UNAUTHORIZED);
            }

            $token = $user->createToken('TOKEN')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'type' => 'Bearer',
                'isLoggedIn' => true
            ], Response::HTTP_OK);

        }
    }

    public function validEmail($token)
    {

        User::where('remember_token', $token)->update([
            'isValidEmail' => User::IS_VALID_EMAIL
        ]);

        return redirect('app/login');
    }

    public function logout(Request $request) {
        DB::table('personal_access_tokens')
        ->where('tokenable_id', $request->id)->delete();

        return response()->json([
           'message' => 'Logour User'
        ], Response::HTTP_OK);
    }
}
