import styled from "styled-components";

export const Layout = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const TopBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const RefreshButton = styled.button`
  background: ${({ theme }) => theme.colors.surfaceAlt};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.radius.round};
  padding: 0 18px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StatusLine = styled.div`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
`;
