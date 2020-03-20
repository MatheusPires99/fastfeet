import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever
} from "react-icons/md";

import { TableAction } from "~/components/Table";

import { Container } from "./styles";

export default function Action({ page, order, handleToggleOpenModal }) {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <button onClick={handleVisible} type="button">
        <MdMoreHoriz size={22} color="#c6c6c6" />
      </button>

      <TableAction visible={visible}>
        <div>
          <button type="button" onClick={() => handleToggleOpenModal()}>
            <MdVisibility size={18} color="#8E5BE8" />
            Visualizar
          </button>
        </div>
        <div>
          <Link to={page}>
            <MdCreate size={18} color="#4D85EE" />
            Editar
          </Link>
        </div>
        <div>
          <button type="button">
            <MdDeleteForever size={18} color="#DE3B3B" />
            Excluir
          </button>
        </div>
      </TableAction>
    </Container>
  );
}

Action.propTypes = {
  page: PropTypes.string.isRequired,
  handleToggleOpenModal: PropTypes.func.isRequired
};
