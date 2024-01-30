import { styled } from "styled-components";

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const NotFoundMessage = styled.p`
  font-size: 2rem;
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5.75rem;
  height: 1.8125rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: ${(props) => props.theme.primary};
  border: none;
  color: white;
`;
