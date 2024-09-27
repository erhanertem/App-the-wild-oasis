import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

// > CHILD JSX ELEMENT STYLING
// STYLED-COMPONENTS MAKE USE OF ES6'S TAGGED TEMPLATE LITERALS FEATURE
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
        <Heading as="h1">The Wild Oasis</Heading>

        <Heading as="h2">Checkin | out</Heading>
        <Button onClick={() => alert('Checked in')}>Check-in</Button>
        <Button onClick={() => alert('Checked out')}>Check-out</Button>

        <Heading as="h3">Form</Heading>
        <Input
          type="number"
          placeholder="Number of Rooms"
        ></Input>
        <Input
          type="number"
          placeholder="Number of Guests"
        ></Input>
      </StyledApp>
    </>
  );
}

export default App;
