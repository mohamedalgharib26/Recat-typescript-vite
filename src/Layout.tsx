import { Suspense, type ReactNode } from "react";
import ErrorBoundary from "./Components/ErrorBoundary";
import Loader from "./Components/Loader";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loader loading={true} />}>{children}</Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Layout;
