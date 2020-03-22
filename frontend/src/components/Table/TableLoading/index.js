import React from "react";
import Skeleton from "react-loading-skeleton";

import { Container, HeaderAction, TableContainer, Pagination } from "./styles";

export default function TableLoading() {
  return (
    <Container>
      <div>
        <HeaderAction>
          <Skeleton width={280} height={32} />
          <div>
            <Skeleton width={240} height={38} />
            <Skeleton width={140} height={36} />
          </div>
        </HeaderAction>

        <TableContainer>
          <Skeleton height={44} />
          <Skeleton height={57} count={10} />
        </TableContainer>

        <Pagination>
          <Skeleton width={60} height={30} />
          <Skeleton width={140} height={30} />
        </Pagination>
      </div>
    </Container>
  );
}
