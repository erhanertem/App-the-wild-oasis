import { cloneElement, createContext, useContext, useState } from 'react';
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

  // GUARD CLAUSE
  if (name !== openName) return null;

  return createPortal(
    // #1. JSX body to be inserted
    <Overlay>
      <StyledModal>
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
