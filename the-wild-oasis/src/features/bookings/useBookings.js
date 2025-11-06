import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";

export default function useBookings(){
    const {isLoading, data: bookings, error} = useQuery({
        queryKey: ['booking'],
        queryFn: getBookings
    })
    
    return {isLoading, bookings, error}
}