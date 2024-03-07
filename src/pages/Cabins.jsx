import { useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddNewCabin from "../features/cabins/AddNewCabin";

function Cabins() {
  const [showAddNewCabinModal, setShowAddNewCabinModal] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable
          showAddNewCabinModal={showAddNewCabinModal}
          setShowAddNewCabinModal={setShowAddNewCabinModal}
        />
        <AddNewCabin
          showAddNewCabinModal={showAddNewCabinModal}
          setShowAddNewCabinModal={setShowAddNewCabinModal}
        />
      </Row>
    </>
  );
}

export default Cabins;
