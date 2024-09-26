import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin({ showAddNewCabinModal, setShowAddNewCabinModal }) {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
      {/* EXAMPLE OF CREATING MULTIPLE MODAL WINDOW DEPENDING ON WHICH MODAL BUTTON CLICKED */}
      {/* <Modal.Open opens="table">
        <Button>Show table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CreateCabinForm />
      </Modal.Window> */}
    </Modal>
  );
}

export default AddCabin;
