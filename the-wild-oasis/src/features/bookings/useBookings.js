import {useQuery} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";

export default function useBookings(){
    const [searchParams] = useSearchParams();
    
    //Filter
    const filterValue = searchParams.get('status');
    const filter = !filterValue || filterValue === 'all' ? null : {field : "status", value: filterValue}
    
    //Sort
    const sortByValue = searchParams.get('sortBy') || 'startDate-desc';
    const [field, direction] = sortByValue.split('-');
    const sortBy = {field, direction}

    const {isLoading, data: bookings, error} = useQuery({
        queryKey: ['booking', filter, sortBy],
        queryFn: () => getBookings({filter, sortBy})
    })
    
    return {isLoading, bookings, error}
}