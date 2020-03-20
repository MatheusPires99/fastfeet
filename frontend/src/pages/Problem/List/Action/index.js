import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdMoreHoriz, MdVisibility, MdDeleteForever } from "react-icons/md";

import { TableAction } from "~/components/Table";

import { Container } from "./styles";

export default function Action() {
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
          <Link to="/">
            <MdVisibility size={18} color="#8E5BE8" />
            Visualizar
          </Link>
        </div>
        <div>
          <button type="button">
            <MdDeleteForever size={18} color="#DE3B3B" />
            Cancelar encomenda
          </button>
        </div>
      </TableAction>
    </Container>
  );
}
