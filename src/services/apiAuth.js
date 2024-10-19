import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  // WARNING: By design, session signup actually flushes the current user signin along with localStorage supabase auth.
  // >#1 Save the current session object from localStorage stored via Supabase client before signing up a new user
  const { data: currentSessionData, error: localStorageRetrieveError } =
    await supabase.auth.getSession();

  const { session } = currentSessionData;

  if (localStorageRetrieveError) {
    throw new Error(localStorageRetrieveError.message);
  }

  // >#2 Sign up a new user with Supabase and pass the fullName, Avator URL as an option
  /*
  In Supabase, the signUp function is used to create a new user account with an email and password. The reason fullName is passed inside the options object (specifically under data) is because the main signUp method is focused on creating authentication-related information (like the email and password). Any additional data related to the user's profile (such as fullName, avatar, or other custom fields) are handled separately and are typically stored in a related profile table.

  email and password: These are core fields for authentication.
  options: This is an object that contains extra information for customizing the sign-up process.
  */
  const { data: user, error: signupError } = await supabase.auth.signUp({
    email, // core requiremnt for supabase email based sign up
    password, // core requirment for supabase email based sign up
    options: {
      data: { fullName, avatar: "" },
    }, // optional fields provided on top of core requiremnts saved under user_metadata
  });

  if (signupError) {
    /**
     * Error object has 4 properties: name, message, stack and cause
     */
    // console.log(signupError.name);
    // console.log(signupError.message);
    // console.log(signupError.cause);
    throw new Error(
      `${signupError.message}. Please try a different email address`
    );
  }

  // >#3. If there is a logged in user, restore original localStorage Auth to keep current user logged in
  if (session) await supabase.auth.setSession(session);

  return user;
}

export async function logout() {
  const { error: logOutError } = await supabase.auth.signOut();

  if (logOutError) {
    throw new Error(logOutError.message);
  }
}

// Function for initial login
export async function login({ email, password }) {
  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    throw new Error(loginError.message);
  }

  // console.log(data);
  // NOTE: THIS DATA IS STORED IN THE LOCAL STORAGE
  return data;
}

export async function updateCurrentUser({
  password,
  fullName,
  newAvatarFile,
  currentAvatarURL,
}) {
  // >#1. Update the fullName OR password
  // ->#1.1 Prep Update Data
  let updateData;
  if (password) updateData = { password };
  if (fullName)
    updateData = {
      // update user_metadata therefore its data key per supabase API
      data: { fullName },
    };
  // ->#1.2 Update User Data
  const { data: updatedUserData, error: updateUserError } =
    await supabase.auth.updateUser(updateData);
  if (updateUserError) {
    throw new Error(updateUserError.message);
  }
  // ->#1.3 Early return if no new Avatar file is provided
  if (!newAvatarFile) return;

  // >#2. Proceed w/ Uploading the new avatar image
  const currentAvatarFileName = currentAvatarURL.split("/").pop();
  const currentAvatarFileExists = currentAvatarURL !== "";
  let fileName;
  // ->#2.2 Upsert the new avatar image
  if (currentAvatarFileExists) {
    fileName = currentAvatarFileName;
    const { error: upsertAvatarError } = await supabase.storage
      .from("avatars")
      .upload(currentAvatarFileName, newAvatarFile, {
        upsert: true,
      });
    if (upsertAvatarError) {
      throw new Error(
        "Error upserting the new avatar file: " + upsertAvatarError.message
      );
    }
  } else {
    // ->#2.1 Prepare the new avatar img name for storing
    fileName = `avatar-${updatedUserData.user.id}-${Date.now()}`;
    // ->#2.2 Upload the new file
    const { error: uploadNewAvatarError } = await supabase.storage
      .from("avatars")
      .upload(fileName, newAvatarFile, {
        cacheControl: "3600",
        upsert: false,
      });
    if (uploadNewAvatarError) {
      throw new Error(
        "Error uploading the new avatar file: " + uploadNewAvatarError.message
      );
    }
  }

  // >#3. Update the avatar in the user data via Cache-Busting Query Parameter to cover also no-avatr picture name change
  const { data: updatedUser, error: updateUserDataError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}?bust=${new Date().getTime()}`,
      },
    });
  if (updateUserDataError) {
    throw new Error(updateUserDataError.message);
  }
  return updatedUser;
}

// Function proof-checking user credentials after login
export async function getCurrentUser() {
  // > Retrieve session object from localStorage stored via Supabase client
  const { data: localStorageData, error: localStorageRetrieveError } =
    await supabase.auth.getSession();

  const { session } = localStorageData;

  if (localStorageRetrieveError) {
    throw new Error(localStorageRetrieveError.message);
  }

  // GUARD CLAUSE - EARLY RETURN IF THERE IS NO ACTIVE SESSION STORED IN LOCALSTORAGE(BY SUPABASE)
  // NOTE: null return is actually the value returned from this function and useGetUser TQ custom hook writes it off to the "user" cache - See TQ dev tool data explorer tab
  if (!session) return null;

  /**
   WHY NEED GETUSER() WHILE THIS DATA IS ALREADY AVAILABLE IN GETSESSION DATA ?

  It's a common practice to refetch user data on navigation, especially in scenarios where user permissions or account status might change frequently.

  Separating the session and user retrieval steps allows for finer-grained control over access and permissions. For example, even if a session is active, there might be scenarios where the user's account has been deactivated or their permissions have changed since their last login. By separately fetching the user information, you can perform additional checks and validations to ensure that the user's access to certain resources is still valid.

  While it may incur additional bandwidth usage, it ensures that your application is always working with the latest user information, thus enhancing security and data accuracy.

  However, you can optimize this process by implementing caching mechanisms or only fetching user data when necessary, depending on your application's specific requirements and performance considerations.
  */
  // > If there is a session recorded in localstorage ask Supabase server to provide the latest and greatest User info to make sure its still a valid authentication and not revoked after this record
  const { data: supabaseUserData, error: supabaseError } =
    await supabase.auth.getUser();

  if (supabaseError) {
    throw new Error(supabaseError.message);
  }

  return supabaseUserData?.user;
}
