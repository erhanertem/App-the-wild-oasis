import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { createCabin } from '../../services/apiCabins';

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  // >#1.REACT-HOOK-FORM
  const {
    register, // Register form field values
    handleSubmit, // Dial in actual form submission fn
    reset, // Resets the form fields
    getValues, // Reads values from other form fields to accomodate dependant form fields
    formState, // Gets the errors from onErrorFn handler out of RHF to be used in practical UI error handling mediums such as toaster
  } = useForm();

  // GET THE ERRORS OUT OF RHF AND USE IT IN JSX BODY CONDITIONALLY
  const { errors } = formState;

  // >#4.OUR CUSTOM SUBMIT HANDLER FN
  function onSubmitFn(data) {
    // Data object is { name, maxCapacity, regularPrice, discount, description}
    // console.log(data);
    // >#7.USE MUTATE FN TO INITIATE TQ FETCHING
    mutate(data);
  }
  function onErrorFn(errors) {
    console.log(errors);
  }

  // >#6.GET A REFERENCE TO TQ CLIENT WHICH WOULD BE USED BY MUTATION ONSUCCESS TO INVALIDATE THE CACHE
  const queryClient = useQueryClient();

  // >#5.CREATE CABIN via TQ
  const {
    isPending: isCreating, // Tracks whether the mutation is in progress (mutation state)
    mutate, // Function to trigger the mutation (like creating a cabin)
    // error, // Holds any error that occurs during the mutation - This is useless as onError is responding to this error object inside him
  } = useMutation({
    // MUTATOR
    mutationFn: createCabin, // Same as mutationFn: (newCabinData) => createCabin(newCabinData),
    // UI INVALIDATOR(REFRESHER) UPON SUCCESS
    onSuccess: () => {
      toast.success('New cabin succesfully created');
      // alert('New cabin succesfully created');

      // >#6.Tell the Query Client Instance to invalidate the cache with a matching TQ KEY
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      // Reset the data @ form after successfull submission
      // NOTE: We do not handle reset inside the custom submit handler fn and keep it as close as possible to onSuccess.
      reset();
    },
    // HANDLE ERRORS
    // onError: (err) => alert(err.message),
    onError: (err) => toast.error(err.message),
  });

  return (
    // >#3.HAVE REACT-HOOK-FORM HANDLESUBMIT <OUR CUSTOM SUBMIT HANDLER FNS> DISCLOSED @ STEP#4 - FOR PROBLEMATIC SUBMISSION ROUTED TO onErrorFn HANDLER (suited only for console.logs), FOR NON-PROBLEMATIC SUBMISSION ROUTED TO onSubmitFn HANDLER
    <Form onSubmit={handleSubmit(onSubmitFn, onErrorFn)}>
      <FormRow
        label='Cabin name'
        error='errors?.name?.message'
      >
        <Input
          type='text'
          id='name'
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'name' - creates onBlur and onChnage props in this styled Input component
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label='Maximum capacity'
        error='errors?.maxCapacity?.message'
      >
        <Input
          type='number'
          id='maxCapacity'
          min={1} //CSS fix for decrementor
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'maxCapacity' - creates onBlur and onChnage props in this styled Input component
          {...register('maxCapacity', {
            required: 'This field is required',
            // VIA MIN TQ ATTR VALIDATION
            // NOTE: NEED CSS MIN/MAX CONTROL AS WELL TO NOT DROP BELOW 1
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow
        label='Regular price'
        error='errors?.regularPrice?.message'
      >
        <Input
          type='number'
          id='regularPrice'
          min={1} //CSS fix for decrementor
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'regularPrice' - creates onBlur and onChnage props in this styled Input component
          {...register('regularPrice', {
            required: 'This field is required',
            // VIA MIN TQ ATTR VALIDATION
            // NOTE: NEED CSS MIN/MAX CONTROL AS WELL TO NOT DROP BELOW 1
            min: { value: 1, message: 'Price should be at least 1' },
          })}
        />
      </FormRow>

      <FormRow
        label='Discount'
        error='errors?.discount?.message'
      >
        <Input
          type='number'
          id='discount'
          min={0} //CSS fix for decrementor
          defaultValue={0}
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'discount' - creates onBlur and onChnage props in this styled Input component
          {...register('discount', {
            required: 'This field is required',
            // Solution#1.VIA CUSTOM VALIDATION
            validate: (value) => value <= getValues().regularPrice || 'Discount should not exceed regular price',
            // Solution#2.VIA MAX TQ ATTR VALIDATION
            // max: { value: getValues().regularPrice, message: 'Discount should not exceed regular price' },
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error='errors?.description?.message'
      >
        <Textarea
          type='number'
          id='description'
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'description' - creates onBlur and onChnage props in this styled Input component
          {...register('description', {
            required: 'This field is required',
          })}
          defaultValue=''
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='image'>Cabin photo</Label>
        <FileInput
          id='image'
          accept='image/*'
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset' //Regular HTML attribute
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
