import { useState } from "react";

import { useLogin } from "./useLogin";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [email, setEmail] = useState("erhan@email.com");
  const [password, setPassword] = useState("pass1234");

  const { login, isLogging } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    // GUARD CLAUSE - Check login entries
    if (!email || !password) return;

    login(
      { email, password },
      // Implement field clearance whether its a success or bad credential
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLogging}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLogging}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button
          size="large"
          disabled={isLogging}
          disabledBackgroundColor="var(--color-brand-600)"
          disabledBorderColor="var(--color-brand-600)"
          disabledColor="var(--color-brand-50)"
          disabledOpacity={1}
        >
          {!isLogging ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
