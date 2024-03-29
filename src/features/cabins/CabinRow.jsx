import { useEffect, useState } from "react";
import styled from "styled-components";

import CreateCabinForm from "./CreateCabinForm";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({
  cabin,
  setShowAddNewCabinModal,
  showAddNewCabinModal,
  activeCabinEditForm,
  setActiveCabinEditForm,
}) {
  const [showEditCabinForm, setShowEditCabinForm] = useState(false);

  // console.log(cabin);
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  // console.log(cabin);

  // > AutoClose all cabin edit forms if Add newCabin clicked
  useEffect(() => {
    if (showAddNewCabinModal === true) {
      setShowEditCabinForm(false);
      setActiveCabinEditForm(null);
    } else setShowEditCabinForm(true);
  }, [showAddNewCabinModal, setActiveCabinEditForm]);

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  // role Attribute is part of WAI-ARIA @ https://www.w3.org/TR/wai-aria/#introroles
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button
            disabled={isCreating}
            onClick={handleDuplicate}
          >
            <HiSquare2Stack />
          </button>
          <button
            onClick={() => {
              if (activeCabinEditForm !== cabinId) {
                //Mark this active cabin
                setActiveCabinEditForm(cabinId);
                // Open its form
                setShowEditCabinForm(true);
              }
              // if this is the active edit form and it shows the edit form
              if (activeCabinEditForm === cabinId && showEditCabinForm) {
                // turn off edit form
                setShowEditCabinForm(false);
                // nullify the selected one
                setActiveCabinEditForm(null);
              }
              // CLOSE ADD NEW CABIN FORM
              setShowAddNewCabinModal(false);
            }}
          >
            <HiPencil />
          </button>
          <button
            onClick={() => deleteCabin({ cabinId, image })}
            disabled={isDeleting}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showEditCabinForm && activeCabinEditForm === cabinId && (
        <CreateCabinForm
          cabinToEdit={cabin}
          setShowEditCabinForm={setShowEditCabinForm}
          setActiveCabinEditForm={setActiveCabinEditForm}
        />
      )}
    </>
  );
}

export default CabinRow;
