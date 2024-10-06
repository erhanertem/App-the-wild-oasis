/* eslint-disable no-unused-vars */
import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

// NOTE: WE PROVIDE CABINTOEDIT WITH AN EMPTY {} BY DEFAULT. BECAUSE WE USE CABIN CREATION FORM FOR TWO ACTIONS: 1. CREATE A NEW CABIN, 2. EDIT AN EXISTING CABIN
function CreateCabinForm({
  cabinToEdit = {},
  setActiveEditForm,
  setShowCurrentEditForm,
  // setShowForm,
  onCloseModal,
}) {
  // FOR CABINS BEING EDITED, PREP THE CABIN DATA FROM cabinToEdit PROP
  const { id: idForCabinEditing, ...editValues } = cabinToEdit;
  // IDENTIFY IF ITS AN EDIT SESSION TO PRELOAD THE VALUES FROM editValues
  const isEditSession = Boolean(idForCabinEditing);
  // console.log('isEditSession :', isEditSession);
  // console.log('cabintoEdit id', idForCabinEditing);

  // >#1.REACT-HOOK-FORM
  const {
    register, // Register form field values
    handleSubmit, // Dial in actual form submission fn
    reset, // Resets the form fields
    getValues, // Reads values from other form fields to accomodate dependant form fields
    formState, // Gets the errors from onErrorFn handler out of RHF to be used in practical UI error handling mediums such as toaster
  } = useForm({ defaultValues: isEditSession ? editValues : {} });

  // GET THE ERRORS OUT OF RHF AND USE IT IN JSX BODY CONDITIONALLY
  const { errors } = formState;

  // >#4.OUR RHF CUSTOM SUBMIT HANDLER FN
  function onSubmitFn(formData) {
    // Data object is { name, maxCapacity, regularPrice, discount, description, image (either a file obj || imageURL)}
    // console.log('createcabinform - formData :', formData);
    // >#7.USE MUTATE FN TO INITIATE TQ FETCHING
    // Before mutation data is submitted, we re-configure the data provided by RHF to so articulate uploaded file data in a more refined manner
    if (isEditSession) {
      // console.log('Using edit session...');
      editCabin(
        { cabinToEdit: formData, idForCabinEditing },
        {
          onSuccess: (data) => {
            reset();
            // Close modal
            onCloseModal?.();
            // Close edit form
            setShowCurrentEditForm(false);
            // Reset active edit form
            setActiveEditForm(null);
          },
        }
      );
    }
    if (!isEditSession) {
      // console.log('Using create session...');
      // console.log(formData);
      createCabin(formData, {
        onSuccess: (data) => {
          // Reset the data @ form after successfull submission
          // NOTE: We do not handle reset inside the custom submit handler fn and keep it as close as possible to onSuccess.
          reset();
          // Close modal
          onCloseModal?.();
          // Close create form after succesfull submission
          // setShowForm(false);
        },
      });
    }
  }
  function onErrorFn(errors) {
    console.log(errors);
    // Log it on the console or any error monitoring services like centry
  }

  // > MOVED TO A CUSTOM HOOK
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  // // >#6.GET A REFERENCE TO TQ CLIENT WHICH WOULD BE USED BY MUTATION ONSUCCESS TO INVALIDATE THE CACHE
  // const queryClient = useQueryClient();
  // // >#5.1.CREATE CABIN via TQ
  // const {
  //   isPending: isCreating, // Tracks whether the mutation is in progress (mutation state)
  //   mutate: createCabin, // Function to trigger the mutation (like creating a cabin)
  //   // error, // Holds any error that occurs during the mutation - This is useless as onError is responding to this error object inside him
  // } = useMutation({
  //   // MUTATOR
  //   mutationFn: createOrEditCabin, // Same as mutationFn: (newCabinData) => createCabin(newCabinData),
  //   // UI INVALIDATOR(REFRESHER) UPON SUCCESS
  //   onSuccess: () => {
  //     toast.success('New cabin succesfully created');
  //     // alert('New cabin succesfully created');

  //     // >#6.1.Tell the Query Client Instance to invalidate the cache with a matching TQ KEY
  //     queryClient.invalidateQueries({
  //       queryKey: ['cabins'],
  //     });
  //     // Reset the data @ form after successfull submission
  //     // NOTE: We do not handle reset inside the custom submit handler fn and keep it as close as possible to onSuccess.
  //     reset();
  //     // Close create form after succesfull submission
  //     setShowForm(false);
  //   },
  //   // HANDLE ERRORS
  //   // onError: (err) => alert(err.message),
  //   onError: (err) => {
  //     toast.error(err.message);
  //     // // Optional - reset the form data upon unsuccesfull db write attempt
  //     // reset();
  //   },
  // });
  // // >#5.2.EDIT CABIN via TQ
  // const { isPending: isEditing, mutate: editCabin } = useMutation({
  //   mutationFn: ({ cabinToEdit, idForCabinEditing }) => createOrEditCabin(cabinToEdit, idForCabinEditing),
  //   onSuccess: () => {
  //     toast.success('Cabin succesfully edited');
  //     // >#6.2.Tell the Query Client Instance to invalidate the cache with a matching TQ KEY
  //     queryClient.invalidateQueries({
  //       queryKey: ['cabins'],
  //     });
  //     reset();
  //     // Close edit form
  //     setShowCurrentEditForm(false);
  //     // Reset active edit form
  //     setActiveEditForm(null);
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  // Combine the loading states
  const isProcessing = isEditing || isCreating;

  return (
    // >#3.HAVE REACT-HOOK-FORM HANDLESUBMIT <OUR CUSTOM SUBMIT HANDLER FNS> DISCLOSED @ STEP#4 - FOR PROBLEMATIC SUBMISSION ROUTED TO onErrorFn HANDLER (suited only for console.logs), FOR NON-PROBLEMATIC SUBMISSION ROUTED TO onSubmitFn HANDLER
    <Form
      onSubmit={handleSubmit(onSubmitFn, onErrorFn)}
      type={onCloseModal ? 'modal' : 'regular'} // Identify the type of form beased on props served
    >
      <FormRow
        label='Cabin name'
        error={errors?.name?.message}
      >
        <Input
          type='text'
          id='name'
          disabled={isProcessing}
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'name' - creates onBlur and onChnage props in this styled Input component
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label='Maximum capacity'
        error={errors?.maxCapacity?.message}
      >
        <Input
          type='number'
          id='maxCapacity'
          disabled={isProcessing}
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
        error={errors?.regularPrice?.message}
      >
        <Input
          type='number'
          id='regularPrice'
          disabled={isProcessing}
          // onWheel={(e) => e.target.blur()} // Disables the scrolling behavior
          // min={1} //CSS fix for decrementor
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'regularPrice' - creates onBlur and onChnage props in this styled Input component
          {...register('regularPrice', {
            required: 'This field is required',
            // VIA MIN TQ ATTR VALIDATION
            // NOTE: NEED CSS MIN/MAX CONTROL AS WELL TO NOT DROP BELOW 1
            min: { value: 1, message: 'Price should be at least 1' },
            max: { value: 32767, message: 'Price can not exceed 32767' },
          })}
        />
      </FormRow>

      <FormRow
        label='Discount'
        error={errors?.discount?.message}
      >
        <Input
          type='number'
          id='discount'
          disabled={isProcessing}
          min={0} //CSS fix for decrementor
          defaultValue={0}
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'discount' - creates onBlur and onChnage props in this styled Input component
          {...register('discount', {
            required: 'This field is required',
            // VIA CUSTOM VALIDATION
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should not exceed regular price',
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          disabled={isProcessing}
          defaultValue=''
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'description' - creates onBlur and onChnage props in this styled Input component
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label='Cabin photo'
        error={errors?.description?.message}
      >
        <FileInput
          // NOTE: We can either provide the attribute here or engae in styled component declaration via attrs() function
          // type='file' // A field that allows users to upload a file.
          id='image'
          accept='image/*'
          disabled={isProcessing}
          // >#2.REGISTER THE ENTERED DATA TO REACT HOOK FORM - Register refers to id 'image' - creates onBlur and onChnage props in this styled Input component
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation='secondary'
          type='reset' //Regular HTML attribute
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isProcessing}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
