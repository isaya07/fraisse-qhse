<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDocumentRequest extends FormRequest
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
            'title' => 'sometimes|string|max:255',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,jpg,jpeg,png|max:20480',
            'version' => 'sometimes|required|string|max:20',
            'category' => 'sometimes|required|string|max:50', // Document Type
            'document_folder_id' => 'nullable|exists:document_folders,id',
            'status' => 'sometimes|required|in:draft,pending_approval,approved,rejected,archived',
            'approved_by' => 'nullable|exists:users,id',
            'published_date' => 'nullable|date',
            'expires_date' => 'nullable|date|after:published_date',
        ];
    }
}
