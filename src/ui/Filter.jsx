import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-200);
    color: var(--color-brand-600);
  }
`;

function Filter({ filterField, options }) {
  // URL PARAMS STATE
  /**
   * useSearchParams: This React Router hook provides access to the URL's query parameters, and allows you to manipulate them.
   * searchParams: Represents the current query parameters in the URL.
   * https://example.com?discount=50&category=clothing --> In this case, discount and category are query parameters.
   * The set method is used to update or add a query parameter to searchParams.
   * setSearchParams: A function to update the query parameters in the URL.
   */
  const [searchParams, setSearchParams] = useSearchParams();
  // Read the current active filter from URL
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    // Modify query parameter w/ a value
    // discount=no-discount
    // searchParams.set("discount", value);
    searchParams.set(filterField, value);
    // Apply this change to the URL
    setSearchParams(searchParams);
  }

  return (
    // > REUSABLE CLIENT-SIDE FILTERING W/PROPS
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}

      {
        // > SINGLE USE CLIENT-SIDE FILTERING
        // <FilterButton onClick={() => handleClick("all")}>All</FilterButton>
        // <FilterButton onClick={() => handleClick("no-discount")}>
        //   {/* NOTE: naming with dashes such as no-discount is because theu will appear in the URL so we cant accept spacing  */}
        //   No Discount
        // </FilterButton>
        // <FilterButton onClick={() => handleClick("with-discount")}>
        //   With Discount
        // </FilterButton>
      }
    </StyledFilter>
  );
}

export default Filter;
