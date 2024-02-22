import styled, { css } from 'styled-components';

// // CSS PREFIX BRINGS IN CSS BEAUTIFY WHEN CSS STATEMENT IS BETWEEN LITERAL ANNOTATION
// // CSS PREFIX IS REQUIRED IN CASES WHERE WE WANT TO APPLY SOME LOGIC
// const test = css`
// 	text-align: center;
// 	${10 > 5 &&
// 	css`
// 		background-color: yellow;
// 	`}
// `;

// const Heading = styled.h1`
// 	font-size: ${10 > 5 ? '30px' : '5px'};
// 	font-weight: 600;
// 	background-color: yellow;
// 	${test}
// `;

const Heading = styled.h1`
	${(props) =>
		props.as === 'h1' &&
		css`
			font-size: 3rem;
			font-weight: 600;
		`}
	${(props) =>
		props.as === 'h2' &&
		css`
			font-size: 2rem;
			font-weight: 600;
		`}
   ${(props) =>
		props.as === 'h3' &&
		css`
			font-size: 2rem;
			font-weight: 500;
		`}
`;

export default Heading;
