import styled from "styled-components";
import { Form } from "formik";

export const Title = styled.h1`
  margin: 0 0 4px;
  font-size: 1.6rem;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0 0 22px;
  font-size: 0.9rem;
`;

export const FormGrid = styled(Form)`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 16px;
  align-items: start;
  margin-bottom: 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldLabel = styled.label`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ErrorText = styled.span`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.78rem;
`;

export const Vs = styled.div`
  align-self: center;
  padding-top: 26px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: 0;
    text-align: center;
  }
`;

export const SubmitButton = styled.button`
  grid-column: 1 / -1;
  justify-self: start;
  background: ${({ theme }) => theme.colors.primary};
  color: #1a1a1a;
  border: none;
  padding: 11px 28px;
  border-radius: ${({ theme }) => theme.radius.round};
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CompareCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 24px;
`;

export const Heads = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
`;

export const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-align: center;
`;

export const Sprite = styled.img`
  width: 110px;
  height: 110px;
  image-rendering: pixelated;
`;

export const Name = styled.span`
  font-weight: 700;
  text-transform: capitalize;
  font-size: 1.05rem;
`;

export const NumberTag = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
`;

export const Row = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
`;

export const PhysicalRow = styled.div`
  display: flex;
  gap: 14px;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const StatTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const StatRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 110px 1fr;
  align-items: center;
  gap: 10px;
`;

export const StatValue = styled.span`
  font-weight: 800;
  text-align: ${({ $side }) => ($side === "left" ? "right" : "left")};
  color: ${({ $winner, theme }) => ($winner ? theme.colors.primary : theme.colors.text)};
`;

export const StatLabel = styled.span`
  text-align: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const SplitTrack = styled.div`
  display: flex;
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.round};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surfaceAlt};
`;

export const SplitFillLeft = styled.div`
  width: ${({ $pct }) => $pct}%;
  background: ${({ theme }) => theme.colors.primaryDark};
`;

export const SplitFillRight = styled.div`
  width: ${({ $pct }) => $pct}%;
  margin-left: auto;
  background: ${({ theme }) => theme.colors.danger};
`;
