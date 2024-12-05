import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationButton = ({ currentPage, totalDocs, onPageChange }) => {

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

// Pagination.scss

// .pagination-container {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
// }

// .pagination-button {
//   padding: 8px 16px;
//   margin: 4px;
//   font-size: 14px;
//   border: 1px solid #ccc;
//   background-color: #fff;
//   cursor: pointer;

//   &:hover {
//     background-color: #f0f0f0;
//   }

//   &:disabled {
//     cursor: not-allowed;
//     background-color: #ddd;
//     color: #888;
//     border: 1px solid #ccc;
//   }
// }

// @media (max-width: 480px) {
//   .pagination-button{
//     padding: 6px 10px;
//     font-size: 12px;
//     overflow-x: scroll;
//   }
// }

export default PaginationButton;
