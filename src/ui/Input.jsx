import { default as styled } from 'styled-components';

const Input = styled.input`
  min-width: 20rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  padding: 0.8 rem 1.2rem;

  &:disabled {
    background-color: #f0f0f0; /* Light grey */
    color: #a0a0a0; /* Grey text */
    cursor: not-allowed; /* Change cursor to show it's disabled */
    opacity: 0.5; /* Optional: Add transparency */
  }
`;

export default Input;
