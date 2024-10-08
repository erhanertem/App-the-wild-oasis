import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createOrEditCabin } from '../../services/apiCabins';

export function useEditCabin() {
  // // >#6.GET A REFERENCE TO TQ CLIENT WHICH WOULD BE USED BY MUTATION ONSUCCESS TO INVALIDATE THE CACHE
  const queryClient = useQueryClient();
  // >#5.2.EDIT CABIN via TQ
  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ cabinToEdit, idForCabinEditing }) => createOrEditCabin(cabinToEdit, idForCabinEditing),
    onSuccess: () => {
      toast.success('Cabin succesfully edited');
      // >#6.2.Tell the Query Client Instance to invalidate the cache with a matching TQ KEY
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      // VERY IMPORTANT! CANT GET THESE INTO A CUSTOM HOOK. INSTEAD WE SPECIFY THEM AS ONSUCCESS OPTIONS WHILE USING THE MUTATOR FUNCTION IN THE SUBMIT HANDLER FN
      // reset();
      // // Close edit form
      // setShowCurrentEditForm(false);
      // // Reset active edit form
      // setActiveEditForm(null);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
