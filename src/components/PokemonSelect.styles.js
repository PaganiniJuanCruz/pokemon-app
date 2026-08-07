import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 11px 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ $error, theme }) => ($error ? theme.colors.danger : theme.colors.border)};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  z-index: 10;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 220px;
  overflow-y: auto;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadow.hover};
`;

export const Option = styled.li`
  padding: 8px 14px;
  cursor: pointer;
  text-transform: capitalize;
  font-size: 0.9rem;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
  }
`;

export const EmptyOption = styled.li`
  padding: 8px 14px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
`;
