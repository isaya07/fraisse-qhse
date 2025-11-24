<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'file' => 'required|file|max:20480', // 20MB max
            'version' => 'required|string|max:20',
            'category' => 'required|string|max:50', // Document Type
            'document_folder_id' => 'nullable|exists:document_folders,id',
            'status' => 'required|in:draft,pending_approval,approved,rejected,archived',
            'approved_by' => 'nullable|exists:users,id',
            'published_date' => 'nullable|date',
            'expires_date' => 'nullable|date|after:published_date',
        ];
    }
}
