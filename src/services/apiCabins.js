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

  // #2. Upload Image to DB storage
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image); //use newCabin file information only
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
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
    // This error throw goes to useMutation @ CabinRow omError key where the error toaster is created
  }
}
