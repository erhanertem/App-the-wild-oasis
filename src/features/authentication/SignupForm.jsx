import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function SignupForm() {
  const {
    register, // Register form field values
    formState, // Gets the errors from onErrorFn handler out of RHF to be used in practical UI error handling mediums such as toaster
    getValues, // Reads the values in the form fields
    handleSubmit, // Dials in actual form submit handler fn
  } = useForm();
  // GET THE ERRORS OUT OF RHF AND USE IT IN JSX BODY CONDITIONALLY
  const { errors } = formState;

  // Handle form submission if validations are passed
  function onSubmitFn(data) {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitFn)}>
      <FormRow
        label="Full name"
        error={errors?.fullName?.message}
      >
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Email address"
        error={errors?.email?.message}
      >
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords do not match",
          })}
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
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
