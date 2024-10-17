import { useForm } from "react-hook-form";

import { useSignup } from "./useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

/**
 * Use temp-mail.org to get temp email adresses which is shortlived but long enough to let the user sign up for our app. As of 2024 temp email signups are not available to supabase
 * Setup gmail smtp server via App pass to send emails to clients
 */

// import { useNavigate } from "react-router-dom";

function SignupForm() {
  // const navigate = useNavigate();
  const { signup, isSigningup } = useSignup();

  const {
    register, // Register form field values
    formState, // Gets the errors from onErrorFn handler out of RHF to be used in practical UI error handling mediums such as toaster
    getValues, // Reads the values in the form fields
    handleSubmit, // Dials in actual form submit handler fn
    reset, // Resets fields to their initial values
  } = useForm();
  // GET THE ERRORS OUT OF RHF AND USE IT IN JSX BODY CONDITIONALLY
  const { errors } = formState;

  // Handle form submission if validations are passed - destructring @ args object in order to dismiss passwordConfirm from the returned form data
  function onSubmitFn({ email, fullName, password }) {
    signup(
      { email, fullName, password },
      {
        onSuccess: () => {
          // Reset form fields
          reset();
          // // Navigate away from the use signup form page
          // navigate("/dashboard");
        },
      }
    );
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
          disabled={isSigningup}
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
          disabled={isSigningup}
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
          disabled={isSigningup}
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
          disabled={isSigningup}
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
          disabled={isSigningup}
        >
          Cancel
        </Button>
        <Button disabled={isSigningup}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
