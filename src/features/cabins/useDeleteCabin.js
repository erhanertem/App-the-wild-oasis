//NOTE: WHY WE DID NOT LOCATR THIS HOOK IN HOOKS FOLDER? BECAUSE ITS NOT USED ACROSS MANY FEATURES. ITS JUST BELONGS TO CABINROW

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";

export function useDeleteCabin() {
  // GET A HOLD OF THE QUERY CLIENT
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    // mutationFn: (id) => deleteCabin(id),
    // NOTE: buton onClick event triggers mutate(cabinId) so cabinId is the id
    mutationFn: ({ cabinId, image }) => deleteCabinAPI(cabinId, image),

    // What we want to do upon successfull delete
    onSuccess: () => {
      // alert("Cabin succesfuly deleted.");
      toast.success("Cabin succesfully deleted.");
      // FORCE REFETCH ON CABINS QUERY
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    // onError: (err) => alert(err.message),
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
