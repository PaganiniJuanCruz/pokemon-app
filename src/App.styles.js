import styled from "styled-components";

export const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 20px 64px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 16px 12px 48px;
  }
`;
