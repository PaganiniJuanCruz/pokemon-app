import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  flex: 1;
  min-width: 220px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border-radius: ${({ theme }) => theme.radius.round};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: pointer;
  font-size: 1.1rem;
  padding: 4px 8px;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;
