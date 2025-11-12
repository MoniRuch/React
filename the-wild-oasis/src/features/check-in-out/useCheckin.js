import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function useCheckin(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const {mutate: checkin, isLoading: isCheckingIn} = useMutation({
        mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId, 
            {isPaid: true, status: 'checked-in', ...breakfast}),
        onSuccess: (data) => {
            toast.success(`Booking #${data.id} is checked-in successfully`);
            queryClient.invalidateQueries({active: true});
            navigate('/');
        },
        onError: () => {
            toast.error('There was an error while checking in')
        }
    });
    
    return {checkin, isCheckingIn}
}