import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  // newCabin is table datat except img file URL + image file - need to replace img File w/img URL while submitting table - need to use only newCabin.image to send file to supabase
  // Creating a cabin is a two phase PROCESS
  // #1. Insert cabin data to a table with imagePath reference
  // TEMPLATE URL FOR UPLOADING IMAGE TO SUPABASE
  // https://gbqeulszotpidhqlpfpy.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // #2. Upload image to supabase storage URL

  console.log("🍕", newCabin);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // #1. Create Cabin in DB
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]) //reuse newCabin replacing image File w/image URL information
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created"); // Hits to useMutation hook's onError property
  }

  // #2. Upload Image to DB bucket
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image); //use newCabin file information only for storage
  // #3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(error);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created" // Hits to useMutation hook's onError property
    );
  }

  return data;
}

export async function deleteCabin(id) {
  // console.log(id);
  // #1. Read the cabin data pertinent to this id - to be used reverting the data if failed deleting the image
  const { data: cabinItem, error: cabinReadError } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id);
  if (cabinReadError) {
    console.error(cabinReadError);
    throw new Error("Can't retrieve Cabin information from DB");
    // This error throw goes to useMutation @ CabinRow omError key where the error toaster is created
  }
  const imgFileName = cabinItem[0].image.split("/").at(-1);
  const backupCabinData = cabinItem[0];

  // #2. Delete the cabin item from DB cabins table
  const { error: cabinDeleteError } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);
  if (cabinDeleteError) {
    console.error(cabinDeleteError);
    throw new Error("Cabin could not be deleted");
    // This error throw goes to useMutation @ CabinRow omError key where the error toaster is created
  }
  // #3. Delete Image from DB bucket
  const { error: fileRemoveError } = await supabase.storage
    .from("cabin-images")
    .remove([imgFileName]);
  // console.log("⛔", data);
  if (fileRemoveError) {
    createCabin(backupCabinData);
    console.error(fileRemoveError);
    throw new Error(
      "Encountered a problem removing the cabin image. Cabin did not get deleted." // Hits to useMutation hook's onError property
    );
  }
}
