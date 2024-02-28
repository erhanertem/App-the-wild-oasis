import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

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
  // > IMPORT FUNCTIONS FROM THE REACT-HOOK-FORM
  // register fn - Registers the inputs
  // handleSubmit fn -  Submits our actual submit function
  // reset fn - function to clear the form data
  const { register, handleSubmit, reset } = useForm();

  // GET A HOLD OF THE REACT QUERY CLIENT TO INVALIDATE THE QUERY STATE
  const queryClient = useQueryClient();

  // CREATE MUTATION QUERY W/ERRO-SUCCESS HANDLING
  const { isPending: isCreating, mutate } = useMutation({
    // mutationFn: (newCabin) => createCabin(newCabin),
    mutationFn: createCabin, // same as below - shorthand version
    onSuccess: () => {
      // Display success notification
      toast.success("New cabin succesfully created");
      // Invalidate the cabins query
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // Reset the data @ form after successfull submission
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  //ACTUAL FORM THAT CALLS MUTATE BY INJECTING THE DATA GATHERED FROM THE REACT-HOOK-FORM
  // Our actual submit form function that mutates our data via useMutation hook
  function onSubmit(data) {
    // console.log(data);
    mutate(data);
    // IMPORTANT!!! - WE DO NOT USE CLEAR() FUNCTION HEAR BECAUSE @  THIS POINT WE ARE NOT SURE ITS SUCCESSFULL TRANSMISSION. THEREFORE, ITS BETTER TO HANDLE FORM RESET @ USEMUTATION HOOK ONSUCCESS KEY
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          // {...register("name")} //For registering data use the corresponding id w/out validation
          {...register("name", { required: "This field is required" })} //For registering data use the corresponding id w/validation
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          // {...register("maxCapacity")} //For registering data use the corresponding id w/out validation
          {...register("maxCapacity", { required: "This field is required" })} //For registering data use the corresponding id w/validation
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regularPrice"
          // {...register("regularPrice")} //For registering data use the corresponding id w/out validation
          {...register("regularPrice", { required: "This field is required" })} //For registering data use the corresponding id w/validation
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          // {...register("discount")} //For registering data use the corresponding id w/out validation
          {...register("discount", { required: "This field is required" })} //For registering data use the corresponding id w/validation
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          // {...register("description")} //For registering data use the corresponding id w/out validation
          {...register("description", { required: "This field is required" })} //For registering data use the corresponding id w/validation
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...(register("image") && null)} //For registering data use the corresponding id
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
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
