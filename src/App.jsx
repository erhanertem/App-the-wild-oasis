import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

//STYLES KEPT OUTSIDE FOR SHARING W/MULTIPLE COMPONENTS
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import Heading from './ui/Heading';
import Row from './ui/Row';

//STYLES KEPT ALONG WITH THE COMPONENT - THEY DO NOT GET USED ELSEWHERE!!!
// const H1 = styled.h1`
// 	font-size: 30px;
// 	font-weight: 600;
// 	background-color: yellow;
// `;

const StyledApp = styled.div`
	/* background-color: orangered; */
	padding: 20px;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<StyledApp>
				{/* <Row type='vertical'> */}
				{/* We dont need to disclose vertical as type prop as its given as defaultProp */}
				<Row>
					<Row type="horizontal">
						<Heading as="h1">THE WILD OASIS</Heading>
						<div>
							<Heading as="h2">Check in and out</Heading>
							{/* <Button variation="primary" size="medium" onClick={() => alert('Checked In')}> */}
							{/* We dont even need to disclose variation and size props as they are defaultProps */}
							<Button onClick={() => alert('Checked In')}>Check in</Button>
							<Button variation="secondary" size="small" onClick={() => alert('Checked Out')}>
								Check out
							</Button>
						</div>
					</Row>
					<Row>
						<Heading as="h3">Form</Heading>
						<form>
							{/* type prop only reflects the custom css change proposed */}
							{/* as prop actually reflects both the custom css change and also the element */}
							<Input type="number" placeholder="Number of guests" />
							<Input type="number" placeholder="Number of guests" />
						</form>
					</Row>
				</Row>
			</StyledApp>
		</>
	);
}

export default App;
