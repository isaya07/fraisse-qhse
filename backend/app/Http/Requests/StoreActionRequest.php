<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreActionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Authorization is handled by Policy or Controller
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'action_type_id' => 'required|exists:action_types,id',
            'priority' => 'required|in:low,medium,high,critical',
            'status' => 'required|in:open,in_progress,completed,cancelled',
            'assigned_to' => 'nullable|exists:users,id',
            'due_date' => 'nullable|date',
            'completed_date' => 'nullable|date|after:due_date',
            'progress' => 'required|integer|min:0|max:100',
            'related_to' => 'nullable|string|max:100',
            'related_id' => 'nullable|integer',
        ];
    }
}
