import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: #444;
    font-weight: bold;
    margin-bottom: 10px;
  }

  input {
    height: 45px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 12px 15px;
    color: #666;
    transition: border-color 0.2s;

    &:focus {
      border-color: #7d40e7;
    }

    &::placeholder {
      color: #999;
    }
  }
`;
