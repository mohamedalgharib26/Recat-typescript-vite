// import { useSelector } from "react-redux";
// import type { RootState } from "./store";
import Loader from "./Loader";
import Error from "./Error";
import { useUiStore } from "../store/Zustand";

type Props = {
  children: React.ReactNode;
};

export const LoaderWrapper: React.FC<Props> = ({ children }: Props) => {
  const { loading, error } = useUiStore();

  if (loading) return <Loader loading={loading} />;
  if (error) return <Error error={error} />;

  return <>{children}</>;
};
