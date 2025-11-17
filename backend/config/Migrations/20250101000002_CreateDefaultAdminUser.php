<?php
declare(strict_types=1);

use Migrations\AbstractMigration;

class CreateDefaultAdminUser extends AbstractMigration
{
    /**
     * Up Method.
     *
     * @return void
     */
    public function up(): void
    {
        $password = password_hash('password', PASSWORD_DEFAULT);
        
        $this->table('users')
            ->insert([
                [
                    'username' => 'admin',
                    'email' => 'admin@qhse.local',
                    'password' => $password,
                    'first_name' => 'Admin',
                    'last_name' => 'QHSE',
                    'role' => 'admin',
                    'is_active' => true,
                    'created' => date('Y-m-d H:i:s'),
                    'modified' => date('Y-m-d H:i:s'),
                ],
                [
                    'username' => 'manager',
                    'email' => 'manager@qhse.local',
                    'password' => $password,
                    'first_name' => 'Manager',
                    'last_name' => 'QHSE',
                    'role' => 'manager',
                    'is_active' => true,
                    'created' => date('Y-m-d H:i:s'),
                    'modified' => date('Y-m-d H:i:s'),
                ],
                [
                    'username' => 'user1',
                    'email' => 'user1@qhse.local',
                    'password' => $password,
                    'first_name' => 'User',
                    'last_name' => 'One',
                    'role' => 'user',
                    'is_active' => true,
                    'created' => date('Y-m-d H:i:s'),
                    'modified' => date('Y-m-d H:i:s'),
                ],
                [
                    'username' => 'viewer',
                    'email' => 'viewer@qhse.local',
                    'password' => $password,
                    'first_name' => 'Viewer',
                    'last_name' => 'QHSE',
                    'role' => 'viewer',
                    'is_active' => true,
                    'created' => date('Y-m-d H:i:s'),
                    'modified' => date('Y-m-d H:i:s'),
                ]
            ])
            ->save();
    }

    /**
     * Down Method.
     *
     * @return void
     */
    public function down(): void
    {
        $this->table('users')
            ->delete(['username IN' => ['admin', 'manager', 'user1', 'viewer']])
            ->save();
    }
}