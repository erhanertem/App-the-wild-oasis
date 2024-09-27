import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';

// > CHILD JSX ELEMENT STYLING
// STYLED-COMPONENTS MAKE USE OF ES6'S TAGGED TEMPLATE LITERALS FEATURE
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
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
