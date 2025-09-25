import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export default function useCreateCabin(){
    const queryClient = useQueryClient();

    const {mutate: createCabin, isLoading: isCreating} = useMutation({
        mutationFn: newCabin => createEditCabin(newCabin),
        onSuccess: () => {
            toast.success("Cabin created Successfully");
            queryClient.invalidateQueries({
                queryKey: ['cabin']
            });
        },
        onError: error => toast.error(error.message)
    })
    
    return {createCabin, isCreating}
}
