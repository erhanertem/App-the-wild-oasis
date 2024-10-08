import { useGetSettings } from './useGetSettings';
import { useUpdateSetting } from './useUpdateSetting';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm() {
  const {
    isLoading,
    settingsData: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {}, // Provided default {} for settingsData, since it does not exist in first mount
  } = useGetSettings();

  const { isUpdatingSetting, updateSetting } = useUpdateSetting();

  if (isLoading) return <Spinner />;

  // > ONBLUR EVENT HANDLER FN
  function handleUpdate(event, fieldNameToUpdate, currFieldData) {
    const { value } = event.target;
    // console.log(value);
    // GUARD CLAUSE
    if (!value) return;
    // Check if user has changed anything else return gracefully
    if (Number(value) === currFieldData) return;
    /*
    Based on supabase specs - update required a column name and the data key/value pait in an object syntax.

    const { data, error } = await supabase
    .from('settings')
    .update({ other_column: 'otherValue' })
    .eq('some_column', 'someValue')
    .select()

    Therefore, we assign field to update in a dynamic way { [fieldNameToUpdate]: value }
  */
    updateSetting({ [fieldNameToUpdate]: value });
  }

  return (
    // THE WAY THIS FORM WORKS IS A NO MANUAL USER SUBMISSION TYPE FORM WHICH TRIGGERS AUTOMATIC UPDATE UPON LEAVING THE FIELDS.
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          disabled={isUpdatingSetting}
          defaultValue={minBookingLength}
          // Add currValue as the third argument to check against what we got onBlur which triggers a UPDATE request to server in order to avoid redundant requests
          onBlur={(e) => handleUpdate(e, 'minBookingLength', minBookingLength)}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          disabled={isUpdatingSetting}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength', maxBookingLength)}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          disabled={isUpdatingSetting}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking', maxGuestsPerBooking)}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          disabled={isUpdatingSetting}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice', breakfastPrice)}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
