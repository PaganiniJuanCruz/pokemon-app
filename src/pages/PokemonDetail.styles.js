import styled from "styled-components";
import { Link } from "react-router-dom";

export const Back = styled(Link)`
  display: inline-block;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const Gallery = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 20px;
`;

export const MainImage = styled.img`
  width: 100%;
  max-width: 260px;
  display: block;
  margin: 0 auto;
  image-rendering: pixelated;
  filter: drop-shadow(0 10px 16px rgba(0, 0, 0, 0.4));
`;

export const Thumbs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
`;

export const Thumb = styled.button`
  width: 52px;
  height: 52px;
  padding: 4px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ $active, theme }) => ($active ? theme.colors.surfaceAlt : "transparent")};
  border: 1px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    image-rendering: pixelated;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const NameHeading = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  text-transform: capitalize;
`;

export const NumberTag = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 700;
`;

export const FavButton = styled.button`
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.surfaceAlt)};
  color: ${({ $active }) => ($active ? "#1a1a1a" : "inherit")};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.round};
  padding: 8px 18px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
`;

export const Section = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 18px 20px;
`;

export const SectionTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const Row = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const PhysicalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
`;

export const PhysicalItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const PhysicalLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const PhysicalValue = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
`;

export const AbilityChip = styled.span`
  padding: 5px 12px;
  border-radius: ${({ theme }) => theme.radius.round};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  font-size: 0.82rem;
  text-transform: capitalize;
  border: ${({ $hidden, theme }) => ($hidden ? `1px dashed ${theme.colors.textMuted}` : "none")};
`;

export const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  padding: 60px 0;
`;
