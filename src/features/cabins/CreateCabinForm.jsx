import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';

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
  // > #1. REACT-HOOK-FORM
  const { register, handleSubmit } = useForm();

  return (
    <Form>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          // > #2. REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'name' - creates onBlur and onChnage props in this styled Input component
          {...register('name')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          // > #2. REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'maxCapacity' - creates onBlur and onChnage props in this styled Input component
          {...register('maxCapacity')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          // > #2. REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'regularPrice' - creates onBlur and onChnage props in this styled Input component
          {...register('regularPrice')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          // > #2. REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'discount' - creates onBlur and onChnage props in this styled Input component
          {...register('discount')}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          // > #2. REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'description' - creates onBlur and onChnage props in this styled Input component
          {...register('description')}
          defaultValue=""
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
