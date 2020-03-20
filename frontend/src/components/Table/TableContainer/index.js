import styled from "styled-components";

const TableContainer = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;

  thead th {
    text-align: left;
    color: #444;
    font-size: 16px;
    padding: 6px 15px 0;

    &:last-child {
      text-align: right;
    }
  }

  tbody td {
    background: #fff;
    border-radius: 4px;
    height: 57px;
    padding: 6px 15px;
    color: #666;
    font-size: 16px;
    margin-bottom: 20px;

    &:last-child {
      text-align: right;
    }

    div {
      display: flex;
      align-items: center;

      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
`;

export default TableContainer;
