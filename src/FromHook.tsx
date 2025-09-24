/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm, type SubmitHandler } from "react-hook-form";

// 1. Define the type of your form data
// تحديد نوع بيانات النموذج
type Inputs = {
  email: string;
  password: string;
};

// eslint-disable-next-line react-refresh/only-export-components
const LoginForm = () => {
  // 2. Initialize the hook and get the necessary functions
  // تهيئة الـ hook والحصول على الدوال اللازمة
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // 3. Define the submit handler function
  // تعريف الدالة التي تتعامل مع الإرسال
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data); // Here you can handle form submission, e.g., send to API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        البريد الإلكتروني:
        <input
          type="email"
          {...register("email", { required: "هذا الحقل مطلوب" })}
        />
      </label>
      {errors.email && (
        <span style={{ color: "red" }}>{errors.email.message}</span>
      )}

      <br />

      <label>
        كلمة المرور:
        <input
          type="password"
          {...register("password", {
            required: "هذا الحقل مطلوب",
            minLength: 6,
          })}
        />
      </label>
      {errors.password && (
        <span style={{ color: "red" }}>{errors.password.message}</span>
      )}

      <br />

      <button type="submit">تسجيل الدخول</button>
    </form>
  );
};
