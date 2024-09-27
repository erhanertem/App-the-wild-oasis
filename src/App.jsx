import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

const StyledApp = styled.div`
  /* background-color: orangered; */
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>

            <div>
              <Heading as="h2">Checkin | out</Heading>
              <Button onClick={() => alert('Checked in')}>Check-in</Button>
              <Button onClick={() => alert('Checked out')}>Check-out</Button>
            </div>
          </Row>

          <Row type="vertical">
            <Heading as="h3">Form</Heading>

            <form>
              <Input
                type="number"
                placeholder="Number of Rooms"
              ></Input>
              <Input
                type="number"
                placeholder="Number of Guests"
              ></Input>
            </form>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
