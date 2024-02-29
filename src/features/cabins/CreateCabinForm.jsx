import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  // > IMPORT FUNCTIONS FROM THE REACT-HOOK-FORM
  // register fn - Registers the inputs
  // handleSubmit fn -  Submits our actual submit function - Intakes two functions as arguments, one responsible for mutating data, the other is error handling.
  // reset fn - function to clear the form data
  // getValues fn - function to get a hold of the inquired registered data
  // formState object - object that allows read errors
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState; //Provides the erro message object for toasters

  // > GET A HOLD OF THE REACT QUERY CLIENT TO INVALIDATE THE QUERY STATE
  const queryClient = useQueryClient();
  // CREATE MUTATION QUERY W/ERROR-SUCCESS HANDLING
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

  // > EVENTHANDLERS FOR HANDLESUBMIT REACT-HOOK-FORM FUNCTION
  //ACTUAL FORM THAT CALLS MUTATE BY INJECTING THE DATA GATHERED FROM THE REACT-HOOK-FORM
  // #1. Our actual submit form function that mutates our data via useMutation hook
  function onSubmit(data) {
    // console.log("👍", { ...data, image: data.image[0] });
    mutate({ ...data, image: data.image[0] });
    // VERY IMPORTANT!!! - WE DO NOT USE CLEAR() FUNCTION HEAR BECAUSE @  THIS POINT WE ARE NOT SURE ITS SUCCESSFULL TRANSMISSION. THEREFORE, ITS BETTER TO HANDLE FORM RESET @ USEMUTATION HOOK ONSUCCESS KEY
  }
  // #2. Our actual error handler function that deals with form data validation failures
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Cabin name"
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          // {...register("name")} //For registering data use the corresponding id w/out validation
          {...register("name", { required: "This field is required" })} //For registering data use the corresponding id w/validation
        />
      </FormRow>

      <FormRow
        label="Maximum capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          min={1}
          // {...register("maxCapacity")} //For registering data use the corresponding id w/out validation
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1, //min value
              message: "Capacity should be at least 1", // In case validation fails message
            },
            max: {
              value: 4, //max value
              message: "Capacity shoudl be at most 4", //In case validation fails message
            },
          })} //For registering data use the corresponding id w/validation
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          min={0}
          // {...register("regularPrice")} //For registering data use the corresponding id w/out validation
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1, //min value
              message: "Regular  price should be greater than zero", // In case validation fails message
            },
          })} //For registering data use the corresponding id w/validation
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          min={0}
          // {...register("discount")} //For registering data use the corresponding id w/out validation
          {...register("discount", {
            required: "This field is required",
            //custom validation function for complex assigments
            validate: (value) => {
              // console.log(value);
              return (
                Number(value) <= Number(getValues().regularPrice) ||
                `Discount should be less than regular price` // In case validation fails message
              );
            },
          })} //For registering data use the corresponding id w/validation
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          // {...register("description")} //For registering data use the corresponding id w/out validation
          {...register("description", { required: "This field is required" })} //For registering data use the corresponding id w/validation
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        error={errors?.description?.message}
      >
        <FileInput
          id="image"
          type="file"
          disabled={isCreating}
          accept="image/*"
          {...register("image", {
            required: "This field is required",
          })} //For registering data use the corresponding id
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isCreating}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
