import CheckinBooking from "../features/check-in-out/CheckinBooking";

function Checkin() {
  // NOTE: This seems a bit nounsense to create a page only referring to another component, but the general rule is to disclose no state or sideeffects on the page components but let the components handle them. We need to be as clean as possible @ pages components.
  return <CheckinBooking />;
}

export default Checkin;
