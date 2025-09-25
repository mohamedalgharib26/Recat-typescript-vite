// hooks/useDeleteUser.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { PostData } from "../../store/Api/ReactQuery";

export function useDeleteUser() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) =>
      PostData<void, void>(`http://localhost:3000/users/${id}`, undefined, {
        method: "DELETE",
      }),
    onSuccess: async () => {
      toast.success("User Deleted ...");
      await qc.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => toast.error("Error .. "),
  });
}
