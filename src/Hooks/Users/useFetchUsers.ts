import { useSuspenseQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../store/Api/ReactQuery";

export const useFetchUsers = () => {
  return useSuspenseQuery({
    queryFn: fetchUsers,
    queryKey: ["users"],
  });
};
