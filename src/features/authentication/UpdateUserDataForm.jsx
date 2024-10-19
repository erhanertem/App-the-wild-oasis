import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useGetUser } from "./useGetUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName, avatar: currentAvatarURL },
    },
  } = useGetUser();

  const { isUpdatingUser, updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [newAvatarFile, setNewAvatarFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    // GUARD CLAUSE - CHECK IF FULLNAME EXISTS, AVATAR IS OPTIONAL
    if (!fullName) return;

    updateUser({ fullName, newAvatarFile, currentAvatarURL });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input
          value={email}
          disabled
        />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setNewAvatarFile(e.target.files[0])}
          disabled={isUpdatingUser}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdatingUser}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
