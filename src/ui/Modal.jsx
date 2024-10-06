import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// ORIGINAL MODAL IMPLEMENTATION
// function Modal({ onClose, children }) {
//   return createPortal(
//     // #1. JSX body to be inserted
//     <Overlay>
//       <StyledModal>
//         <Button onClick={onClose}>
//           <HiXMark />
//         </Button>
//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>,
//     // #2. Where to insert the portal
//     // document.body
//     // document.querySelector(selectors)
//     document.getElementById('modal-container')
//   );
// }

// > CREATE A COMPOUND COMPONENT
// >#1.CREATE CONTEXT API
const ModalContext = createContext();
// >#2.CREATE PARENT COMPONENT W/STANDARD CONTEXT PROVIDER IMPLEMENTATION
function Modal({
  children,
  // Takes in children prop so that it can display child components
  // Children are Modal.Open and Modal.Window
}) {
  // Keep track of which modal window (Modal.Open+Modal.Window) is open, if there is more than one modal we want to display in the future
  const [openName, setOpenName] = useState('');
  // Open/Close the modal window handlers we want to pass thru child API components
  // For the Modal.Window API child component's children - <CreateCabinForm/> @ AddCabin.js
  const handleClose = () => setOpenName('');
  // For the Modal.Open API child component's children - <Button>....</Button> @ AddCabin.js
  const handleOpen = (openName) => setOpenName(openName);

  return (
    // Provide states and props
    <ModalContext.Provider
      value={{ openName, setOpenName, handleClose, handleOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
}
// >#3.CREATE CHILD COMPONENTS
function Open({ opens, children }) {
  const { handleOpen } = useContext(ModalContext);

  // IMPORTANT: WE WANT TO ASSIGN THE CONTEXT STATE TO THE CHILDREN - BUTTON COMPONENT. IN ORDER TO DO THAT WE NEED TO REPACK THE CHILDREN WITH THIS OUTER STATE AND SERVER IT VIA CLONEELEMENT ADVANCED REACT FUNCTION
  // return children;
  return cloneElement(children, { onClick: () => handleOpen(opens) });
}
function Window({ name, children }) {
  const { openName, handleClose } = useContext(ModalContext);
  // Points to the window modal on the DOM
  const ref = useRef();

  useEffect(
    function () {
      // Event handler for Close-On-Click-Outside
      function handleOutOfModalClick(e) {
        // console.log('#1', ref.current);
        // console.log('#2', e.target);
        // console.log('#3', e.target.contains(ref.current));
        // If there is a window modal on DOM and wherever we have clicked (e.target) is NOT within the window REF dom element, proceed with modal close
        if (ref.current && e.target.contains(ref.current)) {
          console.log('Clicked outside');
          handleClose();
        }
      }
      // Event handler for Close-On-Hitting-Escape
      function handleEscapeKey(e) {
        if (e.key === 'Escape') {
          console.log('Escape key pressed');
          handleClose();
        }
      }

      // DOM Event Listeners
      // Event listener for Click outside
      document.addEventListener('click', handleOutOfModalClick);
      // Event listener for Escape key
      document.addEventListener('keydown', handleEscapeKey);

      // Cleanup function upon component dismount
      return () => {
        document.removeEventListener('click', handleOutOfModalClick);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    },
    [handleClose, openName]
  );

  // GUARD CLAUSE
  if (name !== openName) return null;

  return createPortal(
    // #1. JSX body to be inserted
    <Overlay>
      {/* ref identifies the selection on the dom object */}
      <StyledModal ref={ref}>
        <Button onClick={handleClose}>
          <HiXMark />
        </Button>
        {/* IMPORTANT: WE WANT TO ASSIGN THE CONTEXT STATE TO THE CHILDREN -
        CREATECABINFORM COMPONENT. THIS COMPONENT IF ITS CREATE NEW CABIN ACTION THEN WOULD REQUIRE ONCLOSEMODAL HANDLER PROP WHICH IS THE HANDLECLOSE HANDLER WE PROVIDE THRU CONTEXT API HERE. IN ORDER TO DO THAT WE NEED TO REPACK THE CHILDREN
        WITH THIS OUTER STATE AND SERVER IT VIA CLONEELEMENT ADVANCED REACT
        FUNCTION */}
        {/* <div>{children}</div> */}
        <div>{cloneElement(children, { onCloseModal: handleClose })}</div>
      </StyledModal>
    </Overlay>,
    // #2. Where to insert the portal
    // document.body
    // document.querySelector(selectors)
    document.getElementById('modal-container')
  );
}

// >#4.ESTABLISH CC API
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
