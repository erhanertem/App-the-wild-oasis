import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  // CREATE MUTATION QUERY W/ERROR-SUCCESS HANDLING - CREATE NEW CABIN
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    // mutationFn: (newCabin) => createEditCabin(newCabin),
    mutationFn: createEditCabin, // same as below - shorthand version
    onSuccess: () => {
      // Display success notification
      toast.success("New cabin succesfully created");
      // Invalidate the cabins query
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // VERY IMPORTANT!!! WE CAN'T CALL THEM HERE AS WE HAVE NO ACCESS TO THESE HOWEVER, MUTATE FUNCTION PASSED VIA CREATECABIN @ EXPORT ALSO INCLUDES ONSUCCES AND THESE ITEMS BELOW COULDBE CALLED WHERE MUTATION TAKES PLACE IN A OPTIONS OBJECT.
      // // Reset the data @ form after successfull submission
      // reset();
      // // turn off edit form
      // setShowAddNewCabinForm(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
      // // Optional - reset the form data upon unsuccesfull db write attempt
      // reset();
    },
  });

  return { isCreating, createCabin };
}
