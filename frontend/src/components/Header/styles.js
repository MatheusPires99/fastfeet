import styled from "styled-components";

export const Container = styled.header`
  background: #fff;
  padding: 20px 30px;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 26px;
      border-right: 1px solid #ddd;
      margin-right: 30px;
      padding-right: 30px;
    }

    div {
      display: flex;
      align-items: center;

      a {
        color: #999;
        font-weight: bold;
        font-size: 15px;
        transition: color 0.2s;

        & + a {
          margin-left: 20px;
        }

        &:hover {
          color: #444;
        }
      }
    }
  }
`;

export const Profile = styled.aside`
  display: flex;
  flex-direction: column;

  strong {
    margin-bottom: 5px;
  }

  button {
    align-self: flex-end;
    background: none;
    border: 0;
    color: #de3b3b;
  }
`;
