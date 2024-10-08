import { createContext, useContext } from "react";
import styled from "styled-components";
import Empty from "./Empty";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

// > #1.CREATE A CONTEXT API
const TableContext = createContext();

// > #2. CC CONTEXT PROVIDER PARENT COMPONENT
function Table({
  columnsCSS, // Custom CSS for table
  children, // Child API components... Table.Header, Table.Row etc.
}) {
  return (
    <TableContext.Provider value={{ columnsCSS }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

// > #3. CC CHILD API COMPONENTS
function Header({ children }) {
  const { columnsCSS } = useContext(TableContext);

  return (
    <StyledHeader
      role="row"
      columns={columnsCSS}
      as="header"
    >
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columnsCSS } = useContext(TableContext);

  return (
    <StyledRow
      role="row"
      columns={columnsCSS}
    >
      {children}
    </StyledRow>
  );
}
function Body({ data, render, resourcename = "data" }) {
  // data = []; // TEST COMPONENT
  // GUARD CLAUSE - INTERCEPT IF THERE IS NO EXISTING DATA - EARLY RETURN
  if (!data.length || !render) return <Empty resourcename={resourcename} />;

  return <StyledBody>{data.map(render)}</StyledBody>;
}

// > #4.ASSIGN API COMPONENTS
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
