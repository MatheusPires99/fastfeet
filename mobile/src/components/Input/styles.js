import styled from "styled-components/native";

export const Container = styled.View`
  padding: 0 20px;
  height: 45px;
  background: #fff;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput.attrs({
  placeholderTextColor: "#999999",
})`
  flex: 1;
  font-size: 16px;
  color: #272727;
`;
