import { useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins.js";
import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";

import { useCallback, useEffect, useState } from "react";
import supabase from "../../services/supabase.js";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  // GET A HOLD OF THE QUERY CLIENT
  const queryClient = useQueryClient();
  // DECLARE STATE FOR SUPABASE CHANGE BEACON
  const [posts, setPosts] = useState({});

  //FORCE REFETCH UPON SUPABASE BEACON OF ANY CHANGE IN DB
  const handleRefetch = useCallback(() => {
    //INVALIDATE TO FORCE FETCH
    queryClient.invalidateQueries({ queryKey: ["cabins"] });
  }, [queryClient]);

  useEffect(() => {
    // console.log(posts);
    handleRefetch();
  }, [handleRefetch, posts]);

  useEffect(() => {
    //OPEN BEACON UPON CABINTABLE MOUNT
    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "cabins" },
        (payload) => {
          // console.log("Change received!", payload);
          setPosts(payload.new);
        }
      )
      .subscribe();
    // CLEANUP FUNCTION - CLOSE BEACON UPON CABINTABLE DISMOUNT
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const {
    isLoading,
    error,
    data: cabins,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow
          cabin={cabin}
          key={cabin.id}
        />
      ))}
    </Table>
  );
}

export default CabinTable;
