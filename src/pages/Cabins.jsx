import { useState } from 'react';

import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import AddCabin from '../features/cabins/AddCabin';

function Cabins() {
  // STATE TOGGLE BETWEEN edit form AND all create forms
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable
          showForm={showForm}
          setShowForm={setShowForm}
        />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
