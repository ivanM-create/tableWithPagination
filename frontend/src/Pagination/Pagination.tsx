import React from 'react';
import './Pagination.css'

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
};

function Pagination(props: PaginationProps): JSX.Element {
  const { totalPages, currentPage, setCurrentPage } = props;

  const handlePageChange = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page: number) => (
        <button
          type="button"
          key={page}
          onClick={() => handlePageChange(page)}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default React.memo(Pagination);
