import styled from "styled-components";
import { Link } from "react-router-dom";

export const Heading = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.6rem;
`;

export const Count = styled.span`
  font-weight: 700;
  color: ${({ $full, theme }) => ($full ? theme.colors.primary : theme.colors.textMuted)};
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 22px;
  font-size: 0.9rem;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 10px 16px;
`;

export const Order = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const OrderButton = styled.button`
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  border-radius: 4px;
  width: 24px;
  height: 20px;
  cursor: pointer;
  font-size: 0.7rem;
  line-height: 1;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Slot = styled.span`
  width: 22px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 700;
  font-size: 0.85rem;
`;

export const Sprite = styled.img`
  width: 56px;
  height: 56px;
  image-rendering: pixelated;
`;

export const NameLink = styled(Link)`
  font-weight: 700;
  text-transform: capitalize;
  min-width: 130px;
`;

export const NumberTag = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
  min-width: 46px;
`;

export const Types = styled.div`
  display: flex;
  gap: 6px;
  flex: 1;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.danger};
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
`;

export const ExploreLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: #1a1a1a;
  padding: 10px 22px;
  border-radius: ${({ theme }) => theme.radius.round};
  font-weight: 700;
`;
