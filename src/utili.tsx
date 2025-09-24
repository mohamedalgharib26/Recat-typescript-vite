/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  birthDate: Date;
  profilePictureUrl: string;
}

// 1. Using `Pick` to create a new type from a subset of an existing one.
// نستخدم Pick لإنشاء نوع جديد من مجموعة فرعية من نوع موجود.
type ProfileCardProps = Pick<UserProfile, "name" | "email">;

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Email: {email}</p>
    </div>
  );
};

// 2. Using `Omit` to create a new type by removing properties.
// نستخدم Omit لإنشاء نوع جديد بحذف الخصائص.
type UserWithoutId = Omit<UserProfile, "id">;

const CreateUserForm: React.FC<UserWithoutId> = () =>
  /*name, email, birthDate, profilePictureUrl*/
  {
    // ... form logic
    return <div>...</div>;
  };

// 3. Using `Partial` to make all properties optional.
// نستخدم Partial لجعل كل الخصائص اختيارية.
type UserUpdate = Partial<UserProfile>;

const UpdateUserComponent: React.FC = () => {
  const [userUpdates, setUserUpdates] = useState<UserUpdate>({});

  const handleUpdate = (updates: UserUpdate) => {
    // API call to update user
    setUserUpdates((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="الاسم"
        onChange={(e) => handleUpdate({ name: e.target.value })}
      />
      <input
        type="text"
        placeholder="البريد الإلكتروني"
        onChange={(e) => handleUpdate({ email: e.target.value })}
      />
    </div>
  );
};
