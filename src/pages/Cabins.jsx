import { useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showAddNewCabinForm, setShowAddNewCabinForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable
          showAddNewCabinForm={showAddNewCabinForm}
          setShowAddNewCabinForm={setShowAddNewCabinForm}
        />

        <Button
          onClick={() => {
            setShowAddNewCabinForm(
              (showAddNewCabinForm) => !showAddNewCabinForm
            );
          }}
        >
          Add new cabin
        </Button>
        {showAddNewCabinForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
