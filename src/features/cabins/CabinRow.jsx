import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import { useState } from 'react';
import CreateCabinForm from './CreateCabinForm';

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
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  // TOGGLE EDIT CABIN FORM VIEW STATE
  const [showForm, setShowForm] = useState(false);

  const { id: cabinId, name, maxCapacity, regularPrice, discount, image } = cabin;

  // GET A REFERENCE TO TQ CLIENT WHICH WOULD BE USED BY MUTATION ONSUCCESS TO INVALIDATE THE CACHE
  const queryClient = useQueryClient();

  // >#3.DELETE data via TQ
  const {
    isPending: isDeleting, // Tracks whether the mutation is in progress (mutation state)
    mutate, // Function to trigger the mutation (like deleting a cabin)
    // error, // Holds any error that occurs during the mutation - - This is useless as onError is responding to this error object inside him
  } = useMutation({
    //MUTATOR
    mutationFn: deleteCabin, // NOTE: Sames as mutationFn: (id) => deleteCabin(id),
    // As soon as mutation is complete, in order to trigger a refresh by invalidating the cached UI, we make use of onSuccess. This field gets a hold of the TQ client instance
    onSuccess: () => {
      // alert('Cabin succesfully deleted');
      toast.success('Cabin succesfully deleted');
      // Tell the Query Client Instance to invalidate the cache with a matching TQ KEY
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    // onError: (err) => alert(err.message),
    onError: (err) => toast.error(err.message),
  });

  return (
    <>
      <TableRow role='row'>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button onClick={() => setShowForm((show) => !show)}>Edit</button>
          <button
            // >#4.USE MUTATE FN TO INITIATE TQ FETCHING
            onClick={() => mutate(cabinId)}
            disabled={isDeleting}
          >
            Delete
          </button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
