import supabase from './supabase';

export async function getCabins() {
  // IMPORTANT: USING A TRY-CATCH BLOCK DOES NOT HELP RETRIEVE SUPABASE ERROR AS ERROR IS DESIGNED TO BE PART OF THE SUPABASE RESPONSE
  const { data, error: cabinReadError } = await supabase.from('cabins').select('*');
  // GUARD CLAUSE - HANDLE ERROR OBJECT FROM SUPABASE RESPONSE
  if (cabinReadError) {
    // console.log(error): For general debugging, when you want to see the full error object including its stack trace and any custom properties.
    // console.log(error.message): When you want to log only the error message, usually for user-friendly logs or minimal output.
    // console.error(error): When you want to explicitly log an error in a visually distinct way, making it clear that it's an error, for better visibility and emphasis in logs.
    console.error('Error fetching cabins:', cabinReadError);
    throw new Error('Cabins could not be loaded');
  }
  //  RETURN DATA IF THERE IS NO SUPABASE ERROR RESPONSE
  return data;
}

export async function createCabin(newCabinData) {
  const { data, error: cabinCreateError } = await supabase.from('cabins').insert([newCabinData]).select();
  // GUARD CLAUSE - HANDLE ERROR OBJECT FROM SUPABASE RESPONSE
  if (cabinCreateError) {
    console.error('Error creating cabin:', cabinCreateError);
    throw new Error('Cabin could not be created');
  }

  return;
}

export async function deleteCabin(id) {
  const { error: cabinDeleteError } = await supabase.from('cabins').delete().eq('id', id);
  // GUARD CLAUSE - HANDLE ERROR OBJECT FROM SUPABASE RESPONSE
  if (cabinDeleteError) {
    console.error('Error deleting cabin:', cabinDeleteError);
    throw new Error('Cabin could not be deleted');
  }

  return;
}
