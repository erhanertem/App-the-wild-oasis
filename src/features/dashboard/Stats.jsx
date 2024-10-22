import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ recentBookings, confirmedStays, numDays, cabinCount }) {
  // >#1. bookings data
  const numBookings = recentBookings.length || 0;
  // >#2. sales data
  const sales =
    recentBookings.reduce((acc, cur) => acc + cur.totalPrice, 0) || 0;
  // >#3. checkins data
  const checkins = confirmedStays.length || 0;
  // >#4. occupancy data
  // customer checked in nights / number of all days for all cabins
  const occupancy =
    (
      (confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
        (numDays * cabinCount)) *
      100
    ).toFixed(1) + "%";

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupancy}
      />
    </>
  );
}

export default Stats;
