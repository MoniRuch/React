import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteCabin as deleteCabinApi} from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export default function useDeleteCabin(){
    const queryClient = useQueryClient();

    const {isLoading: isDeleting, mutate: deleteCabin} = useMutation({
        mutationFn: id => deleteCabinApi(id),
        onSuccess: () => {
            toast.success('Cabin deleted successfully');
            queryClient.invalidateQueries({
                queryKey: ['cabin']
            })
        },
        onError: error => toast.error(error.message)
    })
    
    return {isDeleting, deleteCabin}
}
