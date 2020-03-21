import React from "react";
import PropTypes from "prop-types";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleDoubleRight,
  FaAngleRight
} from "react-icons/fa";

import { Container } from "./styles";

export default function Pagination({
  currentPage,
  pages,
  totalDocs,
  handlePage
}) {
  return (
    <Container>
      <div>{totalDocs} registros</div>

      <aside>
        <button type="button" onClick={() => handlePage(1)}>
          <FaAngleDoubleLeft color="#fff" size={18} />
        </button>
        <button type="button" onClick={() => handlePage(currentPage - 1)}>
          <FaAngleLeft color="#fff" size={18} />
        </button>
        <span>
          {currentPage} / {pages}
        </span>
        <button type="button" onClick={() => handlePage(currentPage + 1)}>
          <FaAngleRight color="#fff" size={18} />
        </button>
        <button type="button" onClick={() => handlePage(pages)}>
          <FaAngleDoubleRight color="#fff" size={18} />
        </button>
      </aside>
    </Container>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  totalDocs: PropTypes.number.isRequired,
  handlePage: PropTypes.func.isRequired
};
