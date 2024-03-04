import { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CreateCabinForm from "./CreateCabinForm";

import { deleteCabin } from "../../services/apiCabins";
import { formatCurrency } from "../../utils/helpers";

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
  setShowAddNewCabinForm,
  showAddNewCabinForm,
  activeCabinEditForm,
  setActiveCabinEditForm,
}) {
  // GET A HOLD OF THE QUERY CLIENT
  const queryClient = useQueryClient();

  const [showEditCabinForm, setShowEditCabinForm] = useState(false);

  // console.log(cabin);
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  // console.log(cabin);

  // > AutoClose all cabin edit forms if Add newCabin clicked
  useEffect(() => {
    showAddNewCabinForm === true
      ? setShowEditCabinForm(false)
      : setShowEditCabinForm(true);
  }, [showAddNewCabinForm]);

  const { isPending: isDeleting, mutate } = useMutation({
    // mutationFn: (id) => deleteCabin(id),
    // NOTE: buton onClick event triggers mutate(cabinId) so cabinId is the id
    mutationFn: deleteCabin,

    // What we want to do upon successfull delete
    onSuccess: () => {
      // alert("Cabin succesfuly deleted.");
      toast.success("Cabin succesfully deleted.");
      // FORCE REFETCH ON CABINS QUERY
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    // onError: (err) => alert(err.message),
    onError: (err) => toast.error(err.message),
  });

  // role Attribute is part of WAI-ARIA @ https://www.w3.org/TR/wai-aria/#introroles
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
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
                setShowEditCabinForm((showEditCabinForm) => !showEditCabinForm);
                // nullify the selected one
                setActiveCabinEditForm(null);
              }
              // CLOSE ADD NEW CABIN FORM
              setShowAddNewCabinForm(false);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => mutate(cabinId)}
            disabled={isDeleting}
          >
            Delete
          </button>
        </div>
      </TableRow>
      {showEditCabinForm && activeCabinEditForm === cabinId && (
        <CreateCabinForm
          cabinToEdit={cabin}
          setShowEditCabinForm={setShowEditCabinForm}
        />
      )}
    </>
  );
}

export default CabinRow;
