import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {deleteBooking as deleteBookingApi} from "../../services/apiBookings.js";

export default function useDeleteBooking(){
    const queryClient = useQueryClient();

    const {isLoading: isDeleting, mutate: deleteBooking} = useMutation({
        mutationFn: bookingId => deleteBookingApi(bookingId),
        onSuccess: () => {
            toast.success('Booking deleted successfully');
            queryClient.invalidateQueries({
                queryKey: ['bookings']
            })
        },
        onError: error => toast.error(error.message)
    })
    
    return {isDeleting, deleteBooking}
}
