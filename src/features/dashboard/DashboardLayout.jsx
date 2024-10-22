/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useGetCabins } from "../cabins/useGetCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { recentBookings, isLoadingRecentBookings } = useRecentBookings();
  const { confirmedStays, numDays, isLoadingStays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useGetCabins();

  if (isLoadingRecentBookings || isLoadingStays || isLoadingCabins)
    return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        numDays={numDays}
        confirmedStays={confirmedStays}
        cabinCount={cabins.length}
      />
      <div>Statistics</div>
      <div>Today's activity</div>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart recentBookings={recentBookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
