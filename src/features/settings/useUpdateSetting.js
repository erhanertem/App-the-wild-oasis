import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateSetting as updateSettingApi } from '../../services/apiSettings';

export function useUpdateSetting() {
  const queryClient = useQueryClient(); // Get reference to queryClient for invalidation purposes

  const { mutate: updateSetting, isLoading: isUpdatingSetting } = useMutation({
    mutationFn: updateSettingApi,
    // same as (newSetting) => updateSettingApi(newSetting)
    onSuccess: () => {
      toast.success('Settings updated successfully!'); // Display success message
      queryClient.invalidateQueries({ queryKey: 'settings' }); // Trigger re-cache upon successful mutation on 'settings' Key
    },
    onError: (err) => toast.error(err.message), // Display error message
  });

  return { isUpdatingSetting, updateSetting };
}
