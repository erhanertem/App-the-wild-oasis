import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  // GET A REFERENCE TO TQ CLIENT WHICH WOULD BE USED BY MUTATION ONSUCCESS TO INVALIDATE THE CACHE
  const queryClient = useQueryClient();

  // >#3.DELETE data via TQ
  const {
    isPending: isDeleting, // Tracks whether the mutation is in progress (mutation state)
    mutate: deleteCabin, // Function to trigger the mutation (like deleting a cabin)
    // error, // Holds any error that occurs during the mutation - - This is useless as onError is responding to this error object inside him
  } = useMutation({
    //MUTATOR
    mutationFn: deleteCabinApi, // NOTE: Sames as mutationFn: (id) => deleteCabin(id),
    // As soon as mutation is complete, in order to trigger a refresh by invalidating the cached UI, we make use of onSuccess. This field gets a hold of the TQ client instance
    onSuccess: () => {
      // alert('Cabin succesfully deleted');
      toast.success('Cabin succesfully deleted');
      // Tell the Query Client Instance to invalidate the cache with a matching TQ KEY
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    // onError: (err) => alert(err.message),
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
