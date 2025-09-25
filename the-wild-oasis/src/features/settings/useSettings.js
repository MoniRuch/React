import {getSettings} from "../../services/apiSettings.js";
import {useQuery} from "@tanstack/react-query";

export default function useSettings(){
    const {isLoading, data: settings, error} = useQuery({
        queryKey: ['settings'],
        queryFn: getSettings
    });

    return {isLoading, settings, error}
}