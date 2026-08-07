import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Emoji = styled.div`
  font-size: 3rem;
  margin-bottom: 12px;
  filter: grayscale(0.4);
`;

export const Title = styled.p`
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 6px;
`;

export const Subtitle = styled.p`
  margin: 0;
  max-width: 360px;
`;
