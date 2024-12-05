import PaginationButton from "../pagination-button/PaginationButton";


const Pagination = ({ currentPage, totalDocs, onPageChange }) => {
  // console.log(currentPage);
  const totalPages = Math.ceil(totalDocs / 20);
  // console.log("total pages: ", totalPages);
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(++currentPage);
    }
  };

  const handleNumberClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pages = [];
    let start = currentPage - 2;
    if (currentPage < 3) {
      start = 1;
    }
    for (let i = start; i <= Math.min(start + 4, totalPages); i++) {
      pages.push(
        <PaginationButton
          key={i}
          label={i}
          onClick={() => handleNumberClick(i)}
          disabled={i === currentPage}
        />
      );
    }
    return pages;
  };

  return (
    <div className={totalPages > 2 ? "pagination-container" : "d-none"}>
      {/* Previous Button */}
      <PaginationButton
        label="Previous"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      />

      {/* Numbered Pages */}
      {renderPageNumbers()}

      {/* Next Button */}
      <PaginationButton
        label="Next"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      />
    </div>
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


export default Pagination;