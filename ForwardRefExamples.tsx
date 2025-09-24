import React, { forwardRef, useRef, useImperativeHandle } from "react";

/* 
  🟩 مثال 1: Basic forwardRef
  - عندنا CustomInput (Component مخصص)
  - بنستخدم forwardRef علشان ref يوصل للـ <input /> الداخلي
*/

type CustomInputProps = React.ComponentProps<"input">;

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  }
);

/*
  🟩 مثال 2: forwardRef مع API مخصصة
  - هنا مش بس بنمرر ref للـ DOM
  - بنعمل expose لدوال معينة (focus) باستخدام useImperativeHandle
*/

type FancyInputHandle = {
  focus: () => void;
  clear: () => void;
};

type FancyInputProps = React.ComponentProps<"input">;

const FancyInput = forwardRef<FancyInputHandle, FancyInputProps>(
  (props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // نعرض API مخصصة للـ Parent
    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus();
      },
      clear() {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
    }));

    return (
      <input
        ref={inputRef}
        style={{ border: "2px solid teal", padding: "8px" }}
        {...props}
      />
    );
  }
);

/*
  🟩 مثال 3: استخدام forwardRef مع Button مخصص
  - مهم في مكتبات UI لما عايز ref يروح للزرار الداخلي
*/

type CustomButtonProps = React.ComponentProps<"button">;

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        style={{ background: "purple", color: "white", padding: "8px 12px" }}
        {...props}
      />
    );
  }
);

/*
  🟩 App: نجرب كل الأمثلة
*/

export default function ForwardRefExamples() {
  // refs لكل الأمثلة
  const inputRef = useRef<HTMLInputElement>(null);
  const fancyInputRef = useRef<FancyInputHandle>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div style={{ padding: "2rem", display: "grid", gap: "2rem" }}>
      {/* 1️⃣ Basic forwardRef */}
      <section>
        <h2>1️⃣ Basic forwardRef</h2>
        <CustomInput ref={inputRef} placeholder="اكتب هنا" />
        <button onClick={() => inputRef.current?.focus()}>
          Focus Basic Input
        </button>
      </section>

      {/* 2️⃣ forwardRef مع API مخصصة */}
      <section>
        <h2>2️⃣ forwardRef + useImperativeHandle</h2>
        <FancyInput ref={fancyInputRef} placeholder="اكتب هنا" />
        <div style={{ marginTop: "0.5rem" }}>
          <button onClick={() => fancyInputRef.current?.focus()}>
            Focus Fancy Input
          </button>
          <button onClick={() => fancyInputRef.current?.clear()}>
            Clear Fancy Input
          </button>
        </div>
      </section>

      {/* 3️⃣ forwardRef مع Button */}
      <section>
        <h2>3️⃣ forwardRef مع Button</h2>
        <CustomButton ref={buttonRef} onClick={() => alert("Clicked!")}>
          اضغط هنا
        </CustomButton>
        <button onClick={() => buttonRef.current?.focus()}>
          Focus Purple Button
        </button>
      </section>
    </div>
  );
}
