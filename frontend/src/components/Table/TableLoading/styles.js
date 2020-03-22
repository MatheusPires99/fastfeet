import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  div {
    width: 100%;
    font-size: 20px;
    line-height: 2.5;
  }
`;

export const HeaderAction = styled.div`
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
`;

export const TableContainer = styled.div``;

export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 50px;
`;
