import supabase, { supabaseUrl } from './supabase';

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
  // SAMPLE IMG URL FORMAT-> https://gbqeulszotpidhqlpfpy.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // Create a imagename from the received data suited for supabase storing
  const imageFile = newCabinData.image;
  const imageName = `${Math.random()}-${newCabinData.image.name}`.replaceAll('/', '');
  // Create the image path w/ the imagename
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // #1.CREATE CABIN
  const { data: uploadedCabinData, error: cabinCreateError } = await supabase
    .from('cabins')
    // Override imageURL only to provided data for cabin table submission
    .insert([{ ...newCabinData, image: imagePath }])
    .select()
    .single(); // Returns the data without array enclosure for convinience - usefull for deleting record - uploadedCabinData.id
  // GUARD CLAUSE - HANDLE ERROR OBJECT FROM SUPABASE RESPONSE
  if (cabinCreateError) {
    console.error('Error creating cabin:', cabinCreateError);
    throw new Error('Cabin could not be created');
  }
  //#2.UPLOAD IMAGE
  const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, imageFile, {
    cacheControl: '3600',
    upsert: false,
  });
  // GUARD CLAUSE - HANDLE ERROR OBJECT FROM SUPABASE RESPONSE
  if (storageError) {
    // DELETE THE UPLOADED CABIN DATA DUE TO FAILURE UPLOADING THE CABIN IMAGE FILE
    await supabase.from('cabins').delete().eq('id', uploadedCabinData.id);
    // HANDLE UPLOAD ERROR
    console.error('Error uploading image file:', storageError);
    throw new Error('Cabin image could not be uploaded');
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
