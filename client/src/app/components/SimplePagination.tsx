import { Box, Pagination, Typography } from "@mui/material";
import { PaginationDetails } from "../models/pagination";
import { useState } from "react";

interface SimplePaginationProps {
  paginationDetails: PaginationDetails;
  onChange: (pageNumber: number) => void;
}

function SimplePagination({
  paginationDetails,
  onChange,
}: SimplePaginationProps) {
  const { currentPage, pageSize, totalPages, totalCount } = paginationDetails;
  const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);
  const firstItemNumber = (currentPage - 1) * pageSize + 1;
  const lastItemNumber =
    currentPage * pageSize > paginationDetails.totalCount
      ? paginationDetails.totalCount
      : currentPage * pageSize;

  function onPageChange(newPageNumber: number) {
    setCurrentPageNumber(newPageNumber);
    onChange(newPageNumber);
  }

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography>{`Displaying ${firstItemNumber}-${lastItemNumber} of ${totalCount} products`}</Typography>
      <Pagination
        page={currentPageNumber}
        count={totalPages}
        color="secondary"
        size="large"
        onChange={(_, pageNumber: number) => onPageChange(pageNumber)}
      />
    </Box>
  );
}

export default SimplePagination;
