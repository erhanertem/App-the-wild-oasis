import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending: isUpdatingUser, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    // eslint-disable-next-line no-unused-vars
    onSuccess: (updatedUser) => {
      toast.success("User account succesfully updated");
      // console.log(updatedUser);
      // // ALTERNATE#1 MANUAL UPDATE
      // const { user } = updatedUser;
      // queryClient.setQueryData(["user"], user);
      // // ALTERNATE #2 AUTO RE-FETCH BASED ON QUERY KEY
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdatingUser, updateUser };
}
