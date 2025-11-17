import styled from "styled-components";
import React from 'react';
import {useRecentBookings} from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import Stats from "./Stats.jsx";
import {useRecentStays} from "./useRecentStays.js";
import useCabins from "../cabins/useCabins.js";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
    const {bookings, isLoading: isBookingsLoading} = useRecentBookings();
    const {stays, isLoading: isStaysLoading, numDays} = useRecentStays();
    const { cabins, isLoading: isCabinsLoading } = useCabins();

    if(isBookingsLoading || isStaysLoading || isCabinsLoading) return <Spinner />
    return (
        <StyledDashboardLayout>
            <Stats bookings={bookings} confirmStays={stays} numDays={numDays} cabinCount={cabins.length}/>
            <div>Today's activity</div>
            <div>Chart stay durations</div>
            <div>Chart sales</div>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
