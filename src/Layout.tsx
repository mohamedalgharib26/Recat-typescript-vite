import { Suspense, type ReactNode } from "react";
import ErrorBoundary from "./ErrorBoundary";
import Loader from "./Loader";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<Loader loading={true} />}>{children} </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Layout;
