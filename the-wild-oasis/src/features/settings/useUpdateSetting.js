import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateSetting as updateSettingApi} from "../../services/apiSettings.js";

export default function useUpdateSetting() {
    const queryClient = useQueryClient();

    const {mutate: updateSetting, isLoading: isUpdating} = useMutation({
        mutationFn: (newSetting) => updateSettingApi(newSetting),
        onSuccess: () => {
            toast.success("Setting updated Successfully");
            queryClient.invalidateQueries({
                queryKey: ['settings']
            });
        },
        onError: error => toast.error(error.message)
    })

    return ({updateSetting, isUpdating})
}