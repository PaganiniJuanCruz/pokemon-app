import styled from "styled-components";

export const Panel = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionTitle = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const TypeGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TypeChip = styled.button`
  border: 1px solid ${({ $active, $color }) => ($active ? $color : "transparent")};
  background: ${({ $active, $color }) => ($active ? `${$color}33` : "rgba(255,255,255,0.04)")};
  color: ${({ $active, $color, theme }) => ($active ? $color : theme.colors.textMuted)};
  padding: 5px 12px;
  border-radius: ${({ theme }) => theme.radius.round};
  font-size: 0.76rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    color: ${({ $color }) => $color};
  }
`;

export const GenSelect = styled.select`
  padding: 9px 12px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.text};
`;

export const ClearLink = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
`;
