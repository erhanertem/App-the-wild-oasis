import supabase from "./supabase";

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

// Function user credentials after login
export async function getCurrentUser() {
  // > Retrieve session object from localStorage stored via Supabase client
  const { data: localStorageData, error: localStorageRetrieveError } =
    await supabase.auth.getSession();

  const { session } = localStorageData;

  if (localStorageRetrieveError) {
    throw new Error(localStorageRetrieveError.message);
  }

  // GUARD CLAUSE - EARLY RETURN IF THERE IS NO ACTIVE SESSION STORED IN LOCALSTORAGE(BY SUPABASE)
  // NOTE: null return is actually the value returned from this function and useUser TQ custom hook writes it off to the "user" cache - See TQ dev tool data explorer tab
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
