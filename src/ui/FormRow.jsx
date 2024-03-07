import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  /* grid-template-columns: 20rem 1.5fr 0.8fr; */
  grid-template-columns: 20rem minmax(100px, 1fr) 0.5fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Label = styled.label`
  font-weight: 500;
`;
const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {/* 👇 Consider w/no labels (FormRow that includes the button only and no label is proped) or w/labels (the rest) */}
      {/* we can use children.props.id in conditions where children bears only one react component - It reaches that component's props named id and reads it value */}
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
