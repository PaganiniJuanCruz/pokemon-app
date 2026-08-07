import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
`;

export const Sentinel = styled.div`
  height: 1px;
`;

export const LoadingMore = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: 20px 0;
  font-size: 0.85rem;
`;
