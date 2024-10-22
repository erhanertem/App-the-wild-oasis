import { useGetBookings } from "./useGetBookings";
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import Empty from "../../ui/Empty";

function BookingTable() {
  const { bookings = [], count, isLoading } = useGetBookings();
  // NOTE: bookings is given a fallback value of [] to make sure we do not throw an exception before loading data
  // console.log(bookings);

  // // // GUARD CLAUSE - INTERCEPT IF THERE IS NO EXISTING DATA - EARLY RETURN
  // // NOTE: Handled inside the Table.Body Internally
  // if (!bookings.length) return <Empty resourceName="bookings" />;

  // // ❌ ERROR BOUNDARY TESTING CODE
  // const { bookings, count, isLoading } = useGetBookings();
  // if (!bookings.length) return <Empty resourceName="bookings" />;

  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columnsCSS="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          resourcename="bookings"
          data={bookings}
          render={(booking) => (
            <BookingRow
              key={booking.id}
              booking={booking}
            />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
