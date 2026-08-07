import styled from "styled-components";

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: ${({ theme }) => theme.radius.round};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: #1a1a1a;
  background: ${({ $color }) => $color};
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.15);
`;
