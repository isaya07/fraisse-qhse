<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateIndicatorRequest extends FormRequest
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
        $indicatorId = $this->route('indicator'); // Assuming route parameter is 'indicator'

        return [
            'name' => 'sometimes|string|max:255',
            'code' => ['sometimes', 'string', 'max:50', Rule::unique('indicators')->ignore($indicatorId)],
            'indicator_category_id' => 'nullable|exists:indicator_categories,id',
            'manager_id' => 'nullable|exists:users,id',
            'unit' => 'nullable|string|max:50',
            'target_value' => 'nullable|numeric',
            'threshold_min' => 'nullable|numeric',
            'threshold_max' => 'nullable|numeric',
            'calculation_method' => 'nullable|string|max:100',
            'data_source' => 'nullable|string|max:255',
            'frequency' => 'sometimes|in:daily,weekly,monthly,quarterly,yearly',
            'trend_direction' => 'nullable|in:positive,negative,neutral',
            'goal_type' => 'sometimes|in:maximize,minimize,target',
            'created_by' => 'sometimes|exists:users,id',
            'is_active' => 'sometimes|boolean',
        ];
    }
}
