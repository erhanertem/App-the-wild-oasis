import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCabin } = useMutation({
    // mutationFn: (newCabin,id) => createEditCabin(newCabin,id),
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id), // same as above - shorthand version - NOTE: We are allowed to provide only one object as an argument
    onSuccess: () => {
      // Display success notification
      toast.success("Cabin successfully editied");
      // Invalidate the cabins query
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // VERY IMPORTANT!!! WE CAN'T CALL THEM HERE AS WE HAVE NO ACCESS TO THESE HOWEVER, MUTATE FUNCTION PASSED VIA CREATECABIN @ EXPORT ALSO INCLUDES ONSUCCES AND THESE ITEMS BELOW COULDBE CALLED WHERE MUTATION TAKES PLACE IN A OPTIONS OBJECT.
      // // Reset the data @ form after successfull submission
      // reset();
      // // turn off edit form
      // setShowEditCabinForm(false);
      // // nullify the selected one
      // setActiveCabinEditForm(null);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, editCabin };
}
