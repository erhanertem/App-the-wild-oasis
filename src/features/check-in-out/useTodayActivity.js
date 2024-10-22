import { useQuery } from "@tanstack/react-query";

import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading: isLoadingTodayActivities, data: todayActivities } =
    useQuery({
      queryFn: getStaysTodayActivity,
      queryKey: ["today-activity"],
    });

  return { isLoadingTodayActivities, todayActivities };
}
