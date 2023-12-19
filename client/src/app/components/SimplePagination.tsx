import { Box, Pagination, Typography } from "@mui/material";
import { PaginationDetails } from "../models/pagination";

interface SimplePaginationProps {
  paginationDetails: PaginationDetails;
  onChange: (pageNumber: number) => void;
}

function SimplePagination({
  paginationDetails,
  onChange,
}: SimplePaginationProps) {
  const { currentPage, pageSize, totalPages, totalCount } = paginationDetails;

  const firstItemNumber = (currentPage - 1) * pageSize + 1;
  const lastItemNumber =
    currentPage * pageSize > paginationDetails.totalCount
      ? paginationDetails.totalCount
      : currentPage * pageSize;

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography>{`Displaying ${firstItemNumber}-${lastItemNumber} of ${totalCount} products`}</Typography>
      <Pagination
        page={currentPage}
        count={totalPages}
        color="secondary"
        size="large"
        onChange={(_, pageNumber: number) => onChange(pageNumber)}
      />
    </Box>
  );
}

export default SimplePagination;
