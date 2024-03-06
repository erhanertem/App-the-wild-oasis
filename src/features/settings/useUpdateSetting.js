import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingAPI,
    onSuccess: () => {
      // Display success notification
      toast.success("Setting successfully updated");
      // Invalidate the cabins query
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSetting };
}
