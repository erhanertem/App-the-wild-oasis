import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createEditCabin } from "../../services/apiCabins";

function CreateCabinForm({
  cabinToEdit = {},
  setShowEditCabinForm,
  setActiveCabinEditForm,
  setShowAddNewCabinForm,
}) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  // console.log("⚠️", cabinToEdit, editValues, isEditSession);

  // > IMPORT FUNCTIONS FROM THE REACT-HOOK-FORM
  // register fn - Registers the inputs
  // handleSubmit fn -  Submits our actual submit function - Intakes two functions as arguments, one responsible for mutating data, the other is error handling.
  // reset fn - function to clear the form data
  // getValues fn - function to get a hold of the inquired registered data
  // formState object - object that allows read errors
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState; //Provides the erro message object for toasters

  // > GET A HOLD OF THE REACT QUERY CLIENT TO INVALIDATE THE QUERY STATE
  const queryClient = useQueryClient();
  // CREATE MUTATION QUERY W/ERROR-SUCCESS HANDLING - CREATE NEW CABIN
  const { isPending: isCreating, mutate: creatingCabin } = useMutation({
    // mutationFn: (newCabin) => createEditCabin(newCabin),
    mutationFn: createEditCabin, // same as below - shorthand version
    onSuccess: () => {
      // Display success notification
      toast.success("New cabin succesfully created");
      // Invalidate the cabins query
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // Reset the data @ form after successfull submission
      reset();
      // turn off edit form
      setShowAddNewCabinForm(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
      // // Optional - reset the form data upon unsuccesfull db write attempt
      // reset();
    },
  });
  // CREATE MUTATION QUERY W/ERROR-SUCCESS HANDLING - CREATE EDIT CABIN
  const { isPending: isEditing, mutate: editingCabin } = useMutation({
    // mutationFn: (newCabin,id) => createEditCabin(newCabin,id),
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id), // same as above - shorthand version - NOTE: We are allowed to provide only one object as an argument
    onSuccess: () => {
      // Display success notification
      toast.success("Cabin successfully editied");
      // Invalidate the cabins query
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      // Reset the data @ form after successfull submission
      reset();
      // turn off edit form
      setShowEditCabinForm(false);
      // nullify the selected one
      setActiveCabinEditForm(null);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const isWorking = isCreating || isEditing;

  // > EVENTHANDLERS FOR HANDLESUBMIT REACT-HOOK-FORM FUNCTION
  //ACTUAL FORM THAT CALLS MUTATE BY INJECTING THE DATA GATHERED FROM THE REACT-HOOK-FORM
  // #1. Our actual submit form function that mutates our data via useMutation hook
  function onSubmit(data) {
    console.log("🍹- onSubmit @ createcabinform", data);
    // The received data is raw. It has to be prepped to match our supabase table layout
    // console.log("👍", { ...data, image: data.image[0] });

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession) {
      editingCabin({ newCabinData: { ...data, image: image }, id: editId });
    } else creatingCabin({ ...data, image: image }); //table data (except img file url) + image file provided to createEditCabin mutationFn
    // } else createCabin({ ...data, image: data.image[0] }); //table data (except img file url) + image file provided to createEditCabin mutationFn
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
          disabled={isWorking}
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
          disabled={isWorking}
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
              message: "Capacity should be at most 4", //In case validation fails message
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
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          defaultValue=""
          // {...register("description")} //For registering data use the corresponding id w/out validation
          {...register("description", { required: "This field is required" })} //For registering data use the corresponding id w/validation
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        error={errors?.image?.message}
      >
        <FileInput
          id="image"
          type="file"
          disabled={isWorking}
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required", //Conditionalize required - mark tru for non-edit sessions
          })} //For registering data use the corresponding id
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
