import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

// > CHILD JSX ELEMENT STYLING
// STYLED-COMPONENTS MAKE USE OF ES6'S TAGGED LITERALS FEATURE
// CREATE REUSABLE REACT COMPONENTS W/STYLED-COMPONENTS CSS
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;
const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
  margin: 20px;
  cursor: pointer;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.8 rem 1.2rem;
`;

// > PARENT JSX ELEMENT STYLING
// NOTE: THE PARENT JSX GETS STYLEDAPP COMPONENT NAME BY CONVENTION IF THIS HAS TO BE STYLED AS WELL.
const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <H1>The Wild Oasis</H1>
        <Button onClick={() => alert('Checked in')}>Check-in</Button>
        <Button onClick={() => alert('Checked out')}>Check-out</Button>
        <Input
          type="number"
          placeholder="Number of Guests"
        ></Input>
      </StyledApp>
    </>
  );
}

export default App;
