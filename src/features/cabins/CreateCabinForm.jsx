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
  const { register, handleSubmit, reset } = useForm();

  // >#4.OUR CUSTOM SUBMIT HANDLER FN
  function onSubmitFn(data) {
    // Data object is { name, maxCapacity, regularPrice, discount, description}
    // console.log(data);
    // >#7.USE MUTATE FN TO INITIATE TQ FETCHING
    mutate(data);
  }

  // >#6.GET A REFERENCE TO TQ CLIENT WHICH WOULD BE USED BY MUTATION ONSUCCESS TO INVALIDATE THE CACHE
  const queryClient = useQueryClient();

  // >#5.CREATE CABIN via TQ
  const {
    isPending: isCreating, // Tracks whether the mutation is in progress (mutation state)
    mutate, // Function to trigger the mutation (like creating a cabin)
    error, // Holds any error that occurs during the mutation
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
    // >#3.HAVE REACT-HOOK-FORM HANDLESUBMIT <OUR CUSTOM SUBMIT HANDLER FN> DISCLOSED @ STEP#4
    <Form onSubmit={handleSubmit(onSubmitFn)}>
      <FormRow>
        <Label htmlFor='name'>Cabin name</Label>
        <Input
          type='text'
          id='name'
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'name' - creates onBlur and onChnage props in this styled Input component
          {...register('name')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='maxCapacity'>Maximum capacity</Label>
        <Input
          type='number'
          id='maxCapacity'
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'maxCapacity' - creates onBlur and onChnage props in this styled Input component
          {...register('maxCapacity')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='regularPrice'>Regular price</Label>
        <Input
          type='number'
          id='regularPrice'
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'regularPrice' - creates onBlur and onChnage props in this styled Input component
          {...register('regularPrice')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='discount'>Discount</Label>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'discount' - creates onBlur and onChnage props in this styled Input component
          {...register('discount')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor='description'>Description for website</Label>
        <Textarea
          type='number'
          id='description'
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'description' - creates onBlur and onChnage props in this styled Input component
          {...register('description')}
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
