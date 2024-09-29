import { useEffect, useState } from 'react';
import { getCabins } from '../services/apiCabins';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Cabins() {
  const [image, setImage] = useState(null);

  useEffect(function () {
    (async function () {
      const data = await getCabins();
      console.log(data[0]);
      setImage(data[0].image);
    })();
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      {image ? (
        <img
          src={image}
          alt="Cabin"
        />
      ) : (
        <p>No image available</p>
      )}
    </Row>
  );
}

export default Cabins;
