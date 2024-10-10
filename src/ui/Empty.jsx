import styled from "styled-components";

const StyledEmpty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

function Empty({ resourcename }) {
  return <StyledEmpty> No {resourcename} to show at the moment</StyledEmpty>;
}

export default Empty;
