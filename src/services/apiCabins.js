import supabase from './supabase';

export async function getCabins() {
  // USING A TRY-CATCH BLOCK DOES NOT HELP RETRIEVE SUPABASE ERROR AS ERROR IS DESIGNED TO BE PART OF THE SUPABASE RESPONSE UNLESS @ JS LEVEL YOU WANT TO CAPTURE NETWORK ERRORS
  try {
    const { data, error } = await supabase.from('cabins').select('*');
    // GUARD CLAUSE - HANDLE ERROR OBJECT FROM SUPABASE RESPONSE
    if (error) {
      console.error('Error fetching cabins:', error);
      throw new Error('Cabins could not be loaded');
    }
    //  RETRUN DTAA IF THERE IS NO SUPABASE ERROR RESPONSE
    return data;
  } catch (networkError) {
    // console.log(error): For general debugging, when you want to see the full error object including its stack trace and any custom properties.
    // console.log(error.message): When you want to log only the error message, usually for user-friendly logs or minimal output.
    // console.error(error): When you want to explicitly log an error in a visually distinct way, making it clear that it's an error, for better visibility and emphasis in logs.
    console.error(networkError);
    throw new Error('Network error');
  }
}
