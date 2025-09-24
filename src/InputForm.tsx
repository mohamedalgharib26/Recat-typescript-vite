import React, { useState, useCallback, memo } from "react";

// Interfaces for our component props and state.
// واجهات لخصائص ومكونات الحالة.
interface UserFormState {
  firstName: string;
  lastName: string;
  email: string;
}

export interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Child Component: A memoized controlled input.
// المكون الابن: حقل إدخال متحكم به ومحسن الأداء.
const InputField: React.FC<InputFieldProps> = memo(
  ({ label, value, onChange }) => {
    console.log(`Rendering input for: ${label}`);
    return (
      <div style={{ margin: "10px 0" }}>
        <label>{label}: </label>
        <input type="text" value={value} onChange={onChange} />
      </div>
    );
  }
);

// Parent Component: The main form component.
// المكون الأب: مكون النموذج الرئيسي.
const UserProfileForm: React.FC = () => {
  const [formData, setFormData] = useState<UserFormState>({
    firstName: "",
    lastName: "",
    email: "",
  });

  // A single, memoized callback function for all inputs.
  // The key parameter is a string literal union type.
  // دالة واحدة ومحفوظة لجميع حقول الإدخال.
  // مفتاح الدالة هو نوع اتحاد حرفي.
  const handleChange = useCallback((key: keyof UserFormState) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevData) => ({
        ...prevData,
        [key]: e.target.value,
      }));
    };
  }, []); // The dependency array is empty because setFormData is stable.

  return (
    <form
      style={{ padding: "20px", border: "2px solid #333", direction: "rtl" }}
    >
      <h3>ملف المستخدم الشخصي</h3>
      <InputField
        label="الاسم الأول"
        value={formData.firstName}
        onChange={handleChange("firstName")}
      />
      <InputField
        label="الاسم الأخير"
        value={formData.lastName}
        onChange={handleChange("lastName")}
      />
      <InputField
        label="البريد الإلكتروني"
        value={formData.email}
        onChange={handleChange("email")}
      />
    </form>
  );
};

export default UserProfileForm;
