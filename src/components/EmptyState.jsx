import { Emoji, Subtitle, Title, Wrapper } from "./EmptyState.styles.js";

function EmptyState({ icon = "🔍", title, subtitle, children }) {
  return (
    <Wrapper>
      <Emoji role="img" aria-hidden="true">
        {icon}
      </Emoji>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      {children}
    </Wrapper>
  );
}

export default EmptyState;
