import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

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

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  // > MOVED TO A CUSTOM HOOK
  const { deleteCabin } = useDeleteCabin();
  // // GET A REFERENCE TO TQ CLIENT WHICH WOULD BE USED BY MUTATION ONSUCCESS TO INVALIDATE THE CACHE
  // const queryClient = useQueryClient();

  // // >#3.DELETE data via TQ
  // const {
  //   isPending: isDeleting, // Tracks whether the mutation is in progress (mutation state)
  //   mutate, // Function to trigger the mutation (like deleting a cabin)
  //   // error, // Holds any error that occurs during the mutation - - This is useless as onError is responding to this error object inside him
  // } = useMutation({
  //   //MUTATOR
  //   mutationFn: deleteCabin, // NOTE: Sames as mutationFn: (id) => deleteCabin(id),
  //   // As soon as mutation is complete, in order to trigger a refresh by invalidating the cached UI, we make use of onSuccess. This field gets a hold of the TQ client instance
  //   onSuccess: () => {
  //     // alert('Cabin succesfully deleted');
  //     toast.success('Cabin succesfully deleted');
  //     // Tell the Query Client Instance to invalidate the cache with a matching TQ KEY
  //     queryClient.invalidateQueries({
  //       queryKey: ['cabins'],
  //     });
  //   },
  //   // onError: (err) => alert(err.message),
  //   onError: (err) => toast.error(err.message),
  // });
  const { createCabin } = useCreateCabin(); // Used for duplicating cabin

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

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>
        {discount ? formatCurrency(discount) : <span>&mdash;</span>}
      </Discount>
      <div>
        {/* Menus CC context parent component serves as only serving states, etc. Does not bring in additional styling */}
        <Modal>
          {/* MENU BTN+DROP DOWN MENU CONTAINER */}
          <Menus.Menu>
            {/* MENU BTN @ EACH ROW */}
            <Menus.Toggle
              id={cabinId}
              /* We will have many of those  that is why id={cabinId} is being proped */
            />

            {/* MENU LIST CONTAINER */}
            <Menus.List id={cabinId}>
              {/* DUPLICATE ITEM FUNCTION */}
              <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>
              {/* EDIT ITEM FUNCTION MODAL OPENER */}
              <Modal.Open opens='edit'>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>
              {/* DELETE ITEM FUNCTION MODAL OPENER */}
              <Modal.Open opens='delete'>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            {/* EDIT ITEM MODAL */}
            <Modal.Window name='edit'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            {/* DELETE ITEM MODAL */}
            <Modal.Window name='delete'>
              <ConfirmDelete
                resourceName='cabins'
                // >#4.USE MUTATE FN TO INITIATE TQ FETCHING
                // NOTE: Provided image reference to the delete mutation fn so that if there are dubs using the sasme image reference  should not pursue also deleting the image from the bucket
                onConfirm={() => deleteCabin({ cabinId, image })}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
