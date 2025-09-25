import {useQuery} from "@tanstack/react-query";
import {getCabins} from "../../services/apiCabins.js";

export default function useCabins(){
    const {isLoading, data: cabins, error} = useQuery({
        queryKey: ['cabin'],
        queryFn: getCabins
    })
    
    return {isLoading, cabins, error}
}