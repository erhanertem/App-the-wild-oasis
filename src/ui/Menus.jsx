import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

// > #1.CREATE A CONTEXT API
const MenuContext = createContext();

// > #2.CC CONTEXT PROVIDER PARENT COMPONENT
function Menus({
  children, // Child API components...
}) {
  // STATE THAT KEEPS TRACK OF OPEN MENU
  const [openId, setOpenId] = useState(null);
  // STATE THAT REPORTS THE CURRENT CLICKED MENU ICON LOCATION
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  // EVENTHANDLERS
  const handleClose = () => setOpenId(null);
  const handleOpen = (id) => setOpenId(id);

  // PROVIDE CONTEXT
  return (
    <MenuContext.Provider
      value={{
        openId,
        handleClose,
        handleOpen,
        buttonPosition,
        setButtonPosition,
      }}>
      {children}
    </MenuContext.Provider>
  );
}

// > #3.CC CHILD API COMPONENTS
function Toggle({ id }) {
  const { openId, handleClose, handleOpen, setButtonPosition } =
    useContext(MenuContext);

  // Handle close/open menu by clicking the 3 dot button
  function handleClick(e) {
    // VERY IMPORTANT: As soon as the button clicked, we need to calculate the location of the closest parenting button in order to locate the portal created in the Menu.List API component correctly using some DOM traversing
    const rect = e.target.closest("button").getBoundingClientRect();
    setButtonPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === null || openId !== id ? handleOpen(id) : handleClose();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }) {
  const { openId, buttonPosition, handleClose } = useContext(MenuContext);

  const ref = useOutsideClick(handleClose, true, "Escape");

  // GUARD CLAUSE
  if (openId !== id) return null;

  // STYLEDLIST EXPECTS POSITION SC PROP IN {X:..,Y:..} KEY/VALUE PAIRS
  return createPortal(
    <StyledList position={buttonPosition} ref={ref}>
      {children}
    </StyledList>,
    // document.body
    document.getElementById("list-container")
  );
}

function Button({ children, icon, onClick }) {
  const { handleClose } = useContext(MenuContext);

  function handleClick() {
    onClick?.(); //Conditionally call the possibly passed on handleDuplicate function @ Menus.Buutton as some Buttons do have some dont.
    handleClose();
  }

  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

// > #4.ASSIGN API COMPONENTS
Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
