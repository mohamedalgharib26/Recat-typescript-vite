import React, { useState, useCallback } from "react";
import MemoizedButton from "./MemoizedButton";

const ParentComponent: React.FC = () => {
  // Use <number> to explicitly type the state as a number.
  const [count, setCount] = useState<number>(0);

  // The useCallback hook is now aware of the 'count' state's type.
  // The function itself is correctly typed as () => void.

  const handleIncrement = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, [setCount]);

  //   Without Use CallBack
  //  const handleIncrement = () => setCount((prevCount) => prevCount + 1);

  // A better practice is to use the functional update form and
  // make the dependency array contain the 'setCount' setter function,
  // which is guaranteed to be stable. This avoids including 'count' in the deps,
  // preventing stale closures.

  return (
    <div>
      <p>Count: {count}</p>
      <MemoizedButton onClick={handleIncrement} />
    </div>
  );
};

export default ParentComponent;
