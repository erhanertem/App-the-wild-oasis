/* eslint-disable no-unused-vars */
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

export async function createOrEditCabin(formData, idForCabinEditing) {
  // WE UNIFY CREATE AND EDIT OPERATIONS INTO A SINGLE API FUNCTION - THEREFORE FOR CREATING A NEW CABIN WE WOULD NEED newCabinData ARGUMENT. FOR EDITING AN EXISTING CABIN, WE WOULD NEED AN ID ARGUMENT WHICH WOULD HELP US BRANCH INTO ACTIONS IN OUR FUNCTION
  // SAMPLE IMG URL FORMAT-> https://gbqeulszotpidhqlpfpy.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // >CHECK FOR EDIT DATA
  // formData is the raw data which may contain either an image property w/ image URL or an Image File - So we need to identify the nature of the received data for the image property
  const hasImageURL = typeof formData.image === 'string' ? true : false;

  // >CHECK FOR EDIT & NEW DATA
  // Depending on the nature of image data received...Create a image name from the received data suited for supabase storing @ cabins table
  const imageName = hasImageURL
    ? formData.image.split('/').pop()
    : `${Math.random()}-${formData.image[0].name}`.replaceAll('/', '');

  // >CHECK FOR EDIT & NEW DATA
  // Depending on the nature of image data...Create the image path w/ the imagename if image posses a new file information
  const imagePath = hasImageURL ? formData.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // >CLEANEDUP FORM DATA FOR EDIT/EDIT+FILE/NEW DATA
  // Create the adjusted cabin data for submission w/ image URL
  const cleanedFormData = hasImageURL ? formData : { ...formData, image: imagePath };
  console.log('adjustedCabinData :', cleanedFormData);

  // >#1.CREATE/EDIT CABIN
  let cabinData, cabinError;
  // >#1.1.CREATE A CABIN - INSERT DATA
  if (!idForCabinEditing) {
    const { data, error } = await supabase
      .from('cabins')
      // Override imageURL only to provided data for cabin table submission
      .insert([cleanedFormData])
      .select()
      .single(); // Returns the data without array enclosure for convinience - usefull for deleting record - uploadedCabinData.id

    cabinData = data;
    cabinError = error;
  }

  // // > #1.2.EDIT A CABIN
  if (idForCabinEditing) {
    // > #1.2.1.EDIT A CABIN W/NO NEW CABIN PHOTO ATTACHED
    if (hasImageURL) {
      const { data, error } = await supabase.from('cabins').update(cleanedFormData).eq('id', idForCabinEditing);

      cabinData = data;
      cabinError = error;
    }
    // > #1.2.2.EDIT A CABIN W/ NEW CABIN PHOTO ATTACHED
    else {
      const { data, error } = await supabase.from('cabins').update(cleanedFormData).eq('id', idForCabinEditing);

      cabinData = data;
      cabinError = error;
    }
  }

  // GUARD CLAUSE - HANDLE CREATE/EDIT CABIN ERROR OBJECT FROM SUPABASE RESPONSE
  if (cabinError) {
    console.error(`Error ${!idForCabinEditing ? 'creating' : 'editing'} cabin:`, cabinError);
    throw new Error(`Cabin could not be ${!idForCabinEditing ? 'created' : 'edited'}`);
  }

  // >#2.UPLOAD IMAGE FOR EDIT+IMAGE/CREATE CABIN
  // >#2.1.UPLOAD IMAGE FILE
  if (!hasImageURL) {
    const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, formData.image[0], {
      cacheControl: '3600',
      upsert: false,
    });

    // GUARD CLAUSE - HANDLE ERROR OBJECT FROM SUPABASE RESPONSE
    if (storageError) {
      // > #2.1.1 RESPOND TO ERROR WHEN CREATING CABIN
      if (!idForCabinEditing) {
        // DELETE THE UPLOADED CABIN DATA DUE TO FAILURE UPLOADING THE CABIN IMAGE FILE
        await supabase.from('cabins').delete().eq('id', formData.id);
        // HANDLE UPLOAD ERROR
        console.error('Error uploading image file:', storageError);
        throw new Error('Cabin image could not be uploaded');
      }
      // > #2.1.2 RESPOND TO ERROR WHEN UPDATING CABIN+PHOTO FILE
      if (idForCabinEditing) {
        // HANDLE UPLOAD ERROR
        console.error('Error uploading image file:', storageError);
        throw new Error('Cabin image could not be uploaded');
      }
    }
  }

  // return;
  // NOTE: While its not necessary to return cabinData - we may still use this data in TQ custom submit handler fn as an arg input @ onSuccess callback
  return cabinData;
}

export async function deleteCabin(id, image = '') {
  // > #1. Read the cabin data pertinent to this id - to be used reverting the data if failed deleting the image
  const { data: cabin, error: cabinReadError } = await supabase.from('cabins').select('*').eq('id', id);
  if (cabinReadError) {
    console.error(cabinReadError);
    throw new Error("Can't retrieve cabin information from DB");
  }
  const backupCabinData = cabin[0];
  const imgFileName = backupCabinData.image.split('/').pop();

  // > #2. Delete the cabin row from DB cabins table
  const { error: cabinDeleteError } = await supabase.from('cabins').delete().eq('id', id);
  // GUARD CLAUSE - HANDLE ERROR OBJECT FROM SUPABASE RESPONSE
  if (cabinDeleteError) {
    console.error('Error deleting cabin:', cabinDeleteError);
    throw new Error('Cabin could not be deleted');
  }

  // > #3. Check if image is being shared with more than 1 entry
  const { data: imageBearerList, error: imageBearerListError } = await supabase
    .from('cabins')
    .select('image')
    .eq('image', image);
  if (imageBearerListError) {
    //  Error handling
    console.error(imageBearerListError);
    throw new Error('Encountered a problem gathering list of cabins using the same image. Cabin did not get deleted.');
  }
  // console.log(imageBearerList);

  if (!imageBearerList.length) {
    // > #4. Delete Image from DB bucket
    const { error: fileRemoveError } = await supabase.storage.from('cabin-images').remove([imgFileName]);
    // const fileRemoveError = true; // FOR TESTING FILEREMOVE ERROR
    if (fileRemoveError) {
      //Revert deletion
      createOrEditCabin(backupCabinData);
      //Error handling
      console.error(fileRemoveError);
      throw new Error('Encountered a problem removing the cabin image. Cabin did not get deleted.');
    }
  }

  return;
}
