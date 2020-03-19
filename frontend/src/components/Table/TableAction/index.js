import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MdMoreHoriz,
  MdVisibility,
  MdCreate,
  MdDeleteForever
} from "react-icons/md";

import { Container, Actions } from "./styles";

export default function TableAction() {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    setVisible(!visible);
  }

  return (
    <Container>
      <button onClick={handleVisible} type="button">
        <MdMoreHoriz size={22} color="#c6c6c6" />
      </button>
      <Actions visible={visible}>
        <div>
          <button type="button">
            <MdVisibility size={18} color="#8E5BE8" />
            Visualizar
          </button>
        </div>
        <div>
          <Link to="/">
            <MdCreate size={18} color="#4D85EE" />
            Editar
          </Link>
        </div>
        <div>
          <button type="button">
            <MdDeleteForever size={18} color="#DE3B3B" />
            Deletar
          </button>
        </div>
      </Actions>
    </Container>
  );
}
