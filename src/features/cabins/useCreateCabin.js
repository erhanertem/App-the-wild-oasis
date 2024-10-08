import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createOrEditCabin } from '../../services/apiCabins';

export function useCreateCabin() {
  // >#6.GET A REFERENCE TO TQ CLIENT WHICH WOULD BE USED BY MUTATION ONSUCCESS TO INVALIDATE THE CACHE
  const queryClient = useQueryClient();

  // >#5.1.CREATE CABIN via TQ
  const {
    isPending: isCreating, // Tracks whether the mutation is in progress (mutation state)
    mutate: createCabin, // Function to trigger the mutation (like creating a cabin)
    // error, // Holds any error that occurs during the mutation - This is useless as onError is responding to this error object inside him
  } = useMutation({
    // MUTATOR
    mutationFn: createOrEditCabin, // Same as mutationFn: (newCabinData) => createCabin(newCabinData),
    // UI INVALIDATOR(REFRESHER) UPON SUCCESS
    onSuccess: () => {
      toast.success('New cabin succesfully created');
      // alert('New cabin succesfully created');

      // >#6.1.Tell the Query Client Instance to invalidate the cache with a matching TQ KEY
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      // VERY IMPORTANT! CANT GET THESE INTO A CUSTOM HOOK. INSTEAD WE SPECIFY THEM AS ONSUCCESS OPTIONS WHILE USING THE MUTATOR FUNCTION IN THE SUBMIT HANDLER FN
      // // Reset the data @ form after successfull submission
      // // NOTE: We do not handle reset inside the custom submit handler fn and keep it as close as possible to onSuccess.
      // reset();
      // // Close create form after succesfull submission
      // setShowForm(false);
    },
    // HANDLE ERRORS
    // onError: (err) => alert(err.message),
    onError: (err) => {
      toast.error(err.message);
      // // Optional - reset the form data upon unsuccesfull db write attempt
      // reset();
    },
  });

  return { isCreating, createCabin };
}
