<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreRiskFactorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'code' => ['nullable', 'regex:/^E\d{2-Z}$/', 'unique:risk_factors,code'],
            'name' => ['required', 'string', 'max:255'],
        ];
    }
}
