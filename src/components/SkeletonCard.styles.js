import styled from "styled-components";

const shimmerStyle = `
  background: linear-gradient(90deg, #20242e 0px, #2b3040 40px, #20242e 80px);
  background-size: 600px;
  animation: shimmer 1.4s infinite linear;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const ImgPlaceholder = styled.div`
  width: 96px;
  height: 96px;
  border-radius: ${({ theme }) => theme.radius.md};
  ${shimmerStyle}
`;

export const LinePlaceholder = styled.div`
  height: 12px;
  width: ${({ $w }) => $w || "70%"};
  border-radius: 4px;
  ${shimmerStyle}
`;
