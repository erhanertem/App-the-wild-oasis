import supabase from '../../services/supabase';
import { useEffect } from 'react';

import { useGetCabins } from './useGetCabins';

import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import Spinner from '../../ui/Spinner';

// > SINGLE-USE COMPONENT
// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

// function CabinTable() {
//   // > MOVED TO A CUSTOM HOOK
//   const { isLoading, cabins } = useGetCabins();
//   // // >#3.GET data via TQ
//   // const {
//   //   isLoading, // Represents the loading state while the query is fetching data
//   //   data: cabins, // The fetched data (renamed to cabins using object destructuring)
//   //   // error, // Any error that occurred during the fetch
//   // } = useQuery({
//   //   queryKey: ['cabins'], // The unique key for caching and identifying the query
//   //   queryFn: getCabins, // The function responsible for fetching the data
//   // });

//   if (isLoading) return <Spinner />;

//   return (
//     <Table role='table'>
//       <TableHeader role='row'>
//         <div></div>
//         <div>Cabin</div>
//         <div>Capacity</div>
//         <div>Price</div>
//         <div>Discount</div>
//         <div></div>
//       </TableHeader>
//       {cabins.map((cabin) => (
//         <CabinRow
//           cabin={cabin}
//           key={cabin.id}
//         />
//       ))}
//     </Table>
//   );
// }

// > RE-USABLE CABIN TABLE IMPLEMENTATION VIA CC PATTERN
function CabinTable() {
  //   // // >#3.GET data via TQ
  //   // > MOVED TO A CUSTOM HOOK
  const { isLoading, cabins, refetch } = useGetCabins();

  // > #R3.LISTEN FOR SUPABASE BEACON UPON COMPONENT MOUNT FOR SERVER SIDE CHANGES
  useEffect(() => {
    // >#R3.1.CREATE BEACON CHANNEL
    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cabins' },
        (payload) => {
          // GUARD CLAUSE
          // TODO - BOOTLEG SOLUTION
          // Delay the manual instant refetch to ensure image processing is done
          setTimeout(() => {
            refetch();
          }, 2000);

          console.log('🆘Payload received!', payload); // Check full payload
        }
      )
      .subscribe();
    // >#R3.2.CLEANUP FUNCTION - TERMINATE BEACON CHANNEL UPON COMPONENT DISMOUNT
    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  if (isLoading) return <Spinner />;

  return (
    // re-usable CC component container with API components
    <Table columnsCSS='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>

      {/* Pass data into this CC API component in conjunction w/render prop pattern*/}
      <Table.Body
        data={cabins}
        render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
      />
    </Table>
  );
}

export default CabinTable;
