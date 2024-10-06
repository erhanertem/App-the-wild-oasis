import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
// import CabinTable from './CabinTable';

// ORIGINAL MODAL IMPLEMENTATION
// function AddCabin() {
//   // STATE TOGGLE BETWEEN edit form AND all create forms
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((open) => !open)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

function AddCabin() {
  return (
    <Modal>
      {/* We provide Modal.Open API a custom attr called opens whihc needs to match the Modal.Window name attr in our design */}
      <Modal.Open opens='cabin-form'>
        {/* this is the children prop's @ Modal.jsx*/}
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name='cabin-form'>
        {/* this is the children prop's @Modal.jsx*/}
        <CreateCabinForm />
      </Modal.Window>

      {/* Another example modal - we can create as many modals as we want inside this component and only one can be displayed at a time */}
      {/* <Modal.Open opens='table'>
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name='table'>
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
}

export default AddCabin;
