import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

//STYLES KEPT OUTSIDE FOR SHARING W/MULTIPLE COMPONENTS
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import Heading from './ui/Heading';

//STYLES KEPT ALONG WITH THE COMPONENT - THEY DO NOT GET USED ELSEWHERE!!!
// const H1 = styled.h1`
// 	font-size: 30px;
// 	font-weight: 600;
// 	background-color: yellow;
// `;

const StyledApp = styled.div`
	background-color: orangered;
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				<Heading as="h1">THE WILD OASIS</Heading>
				{/* type prop only reflects the custom css change proposed */}

				<Heading as="h2">Check in and out</Heading>
				<Button onClick={() => alert('Checked In')}>Check in</Button>
				<Button onClick={() => alert('Checked Out')}>Check out</Button>

				<Heading as="h3">Form</Heading>
				{/* as prop actually reflects both the custom css change and also the element */}
				<Input type="number" placeholder="Number of guests" />
				<Input type="number" placeholder="Number of guests" />
			</StyledApp>
		</>
	);
}

export default App;
