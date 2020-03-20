import styled from "styled-components";

export const ModalTags = styled.div`
  div {
    display: flex;
    flex-direction: column;

    & + div {
      border-top: 1px solid #ddd;
      margin-top: 15px;
      padding-top: 15px;
    }

    strong {
      color: #444444;
      margin-bottom: 5px;
    }

    span {
      font-weight: normal;
      color: #666666;
      font-size: 16px;
      margin-bottom: 5px;
    }

    img {
      width: 235px;
      margin: 20px auto 0;
    }
  }
`;
