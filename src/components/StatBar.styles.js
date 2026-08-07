import styled from "styled-components";

export const Row = styled.div`
  display: grid;
  grid-template-columns: 90px 40px 1fr;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

export const Label = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Value = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  text-align: right;
`;

export const Track = styled.div`
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.round};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  overflow: hidden;
`;

export const Fill = styled.div`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  border-radius: ${({ theme }) => theme.radius.round};
  background: ${({ $pct, theme }) =>
    $pct > 66 ? theme.colors.success : $pct > 33 ? theme.colors.primary : theme.colors.danger};
  transition: width 0.6s ease;
`;
