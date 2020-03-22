import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px;
  margin: 10px 0 50px;

  div {
    color: #444;
  }

  aside {
    display: flex;
    align-items: center;

    button {
      background: #7d40e7;
      border: 0;
      border-radius: 4px;
      opacity: 0.6;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.2s;

      & + button {
        margin-left: 5px;
      }

      &:hover {
        opacity: 1;
      }
    }

    span {
      color: #666;
      font-weight: bold;
      font-size: 16px;
      margin: 0 10px;
    }
  }
`;
