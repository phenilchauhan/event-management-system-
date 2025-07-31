const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="pagination">
      <button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>Prev</button>
      <span>Page {page} of {totalPages}</span>
      <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
