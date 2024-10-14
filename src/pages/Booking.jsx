import BookingDetail from "../features/bookings/BookingDetail";

function Booking() {
  // NOTE: This seems a bit nounsense to create a page only referring to another component, bbut the general rule is to disclos eno state or sideeffects on the page components but let the components handle them. We need to be as clean as possible @ pages components.
  return <BookingDetail />;
}

export default Booking;
