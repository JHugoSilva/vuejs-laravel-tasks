<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email', Rule::unique(User::class, 'email')],
            'password' => 'required|min:6'
        ];
    }

    public function getData() {
        $data = $this->validated();
        $data['password'] = Hash::make($data['password']);
        $data['isValidEmail'] = User::IS_INVALID_EMAIL;
        $data['remember_token'] = $this->generateRandomCode();
        return $data;
    }

    private function generateRandomCode() {
        $code = Str::random(10).time();
        return $code;
    }
}
