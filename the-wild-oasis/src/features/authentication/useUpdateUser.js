import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateUser as updateUserApi} from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useUpdateUser(){
    const queryClient = useQueryClient();
    const {mutate: updateUser, isUpdating} = useMutation({
        mutationFn: updateUserApi,
        onSuccess:  ({user}) => {
            toast.success("User detail updated successfully");
            queryClient.setQueryData(["user"], user)
            // queryClient.invalidateQueries({
            //     queryKey: ['user']
            // });
        },
        onError: error => toast.error(error.message)
    });
    
    return {updateUser, isUpdating}
}