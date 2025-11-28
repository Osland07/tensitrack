<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRiskFactorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        $id = $this->route('riskFactor')?->id ?? null;

        return [
            'code' => [
                'nullable',
                'regex:/^E\d{2}$/',
                Rule::unique('risk_factors', 'code')->ignore($id),
            ],
            'name' => ['required', 'string', 'max:255'],
        ];
    }
}
