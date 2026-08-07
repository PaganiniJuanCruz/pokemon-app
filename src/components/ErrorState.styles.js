import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 50px 20px;
  gap: 12px;
`;

export const Emoji = styled.div`
  font-size: 2.6rem;
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
  max-width: 360px;
`;

export const RetryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #1a1a1a;
  border: none;
  font-weight: 700;
  padding: 10px 22px;
  border-radius: ${({ theme }) => theme.radius.round};
  cursor: pointer;
  transition: transform 0.15s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;
