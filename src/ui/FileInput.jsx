import styled from 'styled-components';

const FileInput = styled.input.attrs({ type: 'file' })`
  min-width: 22rem;
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }

  &:disabled {
    background-color: #f0f0f0; /* Light grey */
    color: #a0a0a0; /* Grey text */
    cursor: not-allowed; /* Change cursor to show it's disabled */
    opacity: 0.5; /* Optional: Add transparency */
  }
`;

export default FileInput;
