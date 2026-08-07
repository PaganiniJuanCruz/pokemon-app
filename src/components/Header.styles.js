import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 12px;
    gap: 12px;
    flex-wrap: wrap;
  }
`;

export const Logo = styled(NavLink)`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 6px;
  flex: 1;
`;

export const NavItem = styled(NavLink)`
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius.round};
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMuted};
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    color: ${({ theme }) => theme.colors.text};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primaryDark};
    color: #fff;
  }
`;

export const Badge = styled.span`
  margin-left: 6px;
  background: ${({ theme }) => theme.colors.primary};
  color: #1a1a1a;
  font-size: 0.68rem;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: ${({ theme }) => theme.radius.round};
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`;

export const Dot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ $online, theme }) => ($online ? theme.colors.online : theme.colors.offline)};
  box-shadow: 0 0 0 3px ${({ $online }) => ($online ? "rgba(76,175,80,0.18)" : "rgba(227,53,13,0.2)")};
`;
