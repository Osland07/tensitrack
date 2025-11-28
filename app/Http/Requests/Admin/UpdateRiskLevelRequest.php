<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRiskLevelRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $id = $this->route('riskLevel')?->id ?? null;

        return [
            'code' => [
                'nullable',
                'regex:/^H\d{2}$/',
                Rule::unique('risk_levels', 'code')->ignore($id),
            ],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'suggestion' => ['nullable', 'string'],
        ];
    }
}
