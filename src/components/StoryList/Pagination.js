import "./styles/pagination.scss";

import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ storyType, pageNum }) => {
  return (
    <nav aria-label="pagination">
      {pageNum > 0 && (
        <>
          <Link to={`/stories/${storyType}/page/${pageNum - 1}`}>
            Previous Page
          </Link>
          <span> | </span>
        </>
      )}
      <Link to={`/stories/${storyType}/page/${pageNum + 1}`}>
        Next Page...
      </Link>
    </nav>
  );
};

export default Pagination;
