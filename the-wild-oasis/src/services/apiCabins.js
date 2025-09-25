import supabase, {supabaseUrl} from "./supabase.js";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*');
    
    if(error){
        console.error(error);
        throw new Error('There is a problem getting cabin')
    }
    
    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)

    if(error){
        console.error(error);
        throw new Error('There is a problem deleting cabin')
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    console.log('here', hasImagePath)
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    console.log('here2', imagePath)
    
    let query = supabase.from('cabins')
    
    //Step 1: CREATE CABIN
    if(!id) {
          query =  query
            .insert([{...newCabin, image: imagePath}])
    }

    if(id) {
        query =  query
            .update({...newCabin, image: imagePath})
            .eq('id', id)
    }

    const { data, error } = await query.select().single()

    if(error){
        console.error(error);
        throw new Error('There is a problem creating cabin')
    }

    //STEP 2: UPLOAD PHOTO
    const { error: storageError } = await supabase
        .storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)
    
    //STEP 3: DELETE PHOTO IN CASE OF ERROR
    if(storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)
    }

    return data;
}