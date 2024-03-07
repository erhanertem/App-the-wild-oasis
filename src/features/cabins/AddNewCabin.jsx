import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin({ showAddNewCabinModal, setShowAddNewCabinModal }) {
  return (
    <>
      <Button
        onClick={() => {
          setShowAddNewCabinModal((show) => !show);
        }}
      >
        Add new cabin
      </Button>
      {showAddNewCabinModal && (
        <Modal onClose={() => setShowAddNewCabinModal(false)}>
          <CreateCabinForm
            onCloseModal={() => setShowAddNewCabinModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
