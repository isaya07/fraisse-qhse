<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'first_name',
        'last_name',
        'role',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'is_active' => 'boolean',
            'password' => 'hashed',
        ];
    }
    /**
     * Get the actions assigned to the user.
     */
    public function assignedActions()
    {
        return $this->hasMany(Action::class, 'assigned_to');
    }

    /**
     * Get the user's notification settings.
     */
    public function notificationSettings()
    {
        return $this->hasOne(NotificationSetting::class);
    }

    /**
     * Get the equipment assignments for the user.
     */
    public function equipmentAssignments()
    {
        return $this->hasMany(EquipmentAssignment::class);
    }

    /**
     * Get currently assigned equipment.
     */
    public function currentEquipment()
    {
        return $this->hasManyThrough(
            Equipment::class,
            EquipmentAssignment::class,
            'user_id', // Foreign key on EquipmentAssignment table...
            'id', // Foreign key on Equipment table...
            'id', // Local key on User table...
            'equipment_id' // Local key on EquipmentAssignment table...
        )->whereNull('equipment_assignments.returned_at');
    }
}
