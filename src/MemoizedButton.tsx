import React from "react";

// 1. Define the type for the component's props.
interface ButtonProps {
  onClick: () => void;
}

// 2. Use the defined type for the component's props.
const Button: React.FC<ButtonProps> = ({ onClick }) => {
  console.log("Button component rendered!");
  return <button onClick={onClick}>Increment</button>;
};

// 3. Memoize the component. React.memo can infer the props,
// but it's good practice to be explicit.
const MemoizedButton = React.memo(Button);

export default MemoizedButton;
