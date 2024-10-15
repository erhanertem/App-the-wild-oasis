import supabase from "./supabase";

// Function for initial login
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error);
  }

  // console.log(data);
  // NOTE: THIS DATA IS STORED IN THE LOCAL STORAGE
  return data;
}

// Function user credentials after login
export async function getCurrentUser() {
  const { data: localStorageData, error: localStorageRetrieveError } =
    await supabase.auth.getSession();

  const { session } = localStorageData;

  if (localStorageRetrieveError) {
    throw new Error(localStorageRetrieveError);
  }

  // GUARD CLAUSE - EARLY RETURN IF THERE IS NO ACTIVE SESSION STORED IN LOCALSTORAGE(BY SUPABASE)
  if (!session) return null;

  /**
  WHY NEED GETUSER() WHILE THIS DATA IS ALREADY AVAILABLE IN GETSESSION DATA ?

  It's a common practice to refetch user data on navigation, especially in scenarios where user permissions or account status might change frequently.

  Separating the session and user retrieval steps allows for finer-grained control over access and permissions. For example, even if a session is active, there might be scenarios where the user's account has been deactivated or their permissions have changed since their last login. By separately fetching the user information, you can perform additional checks and validations to ensure that the user's access to certain resources is still valid.

  While it may incur additional bandwidth usage, it ensures that your application is always working with the latest user information, thus enhancing security and data accuracy.

  However, you can optimize this process by implementing caching mechanisms or only fetching user data when necessary, depending on your application's specific requirements and performance considerations.
  */
  const { data: supabaseUserData, error: supabaseError } =
    await supabase.auth.getUser();

  if (supabaseError) {
    throw new Error(supabaseError);
  }

  return supabaseUserData?.user;
}
