import { PAGE_SIZE_PER_PAGINATION } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings(filter, sortBy, page) {
  // BASE QUERY
  let query = supabase
    .from("bookings")
    /**
     * 'id, created_at, ...' builds selected columns for the bookings table
     * 'cabin(name)' only graps cabin name column from matching cabins
     * 'guests(fullName, email)' only graps fullName and email columns from matching guests
     */
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)",
      { count: "exact" } // Query the data for the exact number of results. We need this number because, PAGUINATION query addition to this base query will limit itself a certain number of results which won't allow us to paginate.
    );

  // CONDITIONAL FUNCTIONS GOES HERE BASED ON FILTERBY OR SORTBY ARGS!
  // FILTER
  if (filter) {
    console.log(filter);
    query = query[filter.method || "eq"](filter.field, filter.value);
    // // 💡 ALLOW CUSTOMZIATION OF METHOD
    // query = query[filter.method || "eq"](filter.field, filter.value);
  }
  // SORT
  if (sortBy.field && sortBy.direction) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }
  // PAGINATION
  if (page) {
    const from = (page - 1) * PAGE_SIZE_PER_PAGINATION;
    const to = from + PAGE_SIZE_PER_PAGINATION - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return {
    data, // Crippled data pagination portion
    count, // Total number of results for the whole query free of pagination
  };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
