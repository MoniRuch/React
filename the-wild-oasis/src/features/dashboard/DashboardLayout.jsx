import styled from "styled-components";
import React from 'react';
import {useRecentBookings} from "./useRecentBookings.js";
import Spinner from "../../ui/Spinner.jsx";
import Stats from "./Stats.jsx";
import {useRecentStays} from "./useRecentStays.js";
import useCabins from "../cabins/useCabins.js";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import TodayActivity from "../check-in-out/TodayActivity.jsx";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
    const {bookings, isLoading: isBookingsLoading} = useRecentBookings();
    const {stays, isLoading: isStaysLoading, numDays, confirmedStays} = useRecentStays();
    const { cabins, isLoading: isCabinsLoading } = useCabins();

    if(isBookingsLoading || isStaysLoading || isCabinsLoading) return <Spinner />
    return (
        <StyledDashboardLayout>
            <Stats bookings={bookings} confirmStays={stays} numDays={numDays} cabinCount={cabins.length}/>
            <TodayActivity />
            <DurationChart confirmedStays={confirmedStays} />
            <SalesChart bookings={bookings} numDays={numDays}/>
        </StyledDashboardLayout>
    );
}

export default DashboardLayout;
