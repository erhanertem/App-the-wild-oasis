import { useSearchParams } from "react-router-dom";

import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get("sortBy") || "";
  // Empty string fallback value is the first option inthe sortBy dropdown menu

  // EVENT HANDLER FUNCTION FOR THE DROP DOWN SELECT MENU THAT UPDATES URL
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
