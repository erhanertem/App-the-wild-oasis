import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingUser, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (data) => {
      toast.success("User account succesfully updated");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      // MANUALLY UPDATE AVATAR
      console.log("-->", data);
      queryClient.setQueryData("avatars", data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingUser, updateUser };
}
