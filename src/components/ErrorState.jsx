import { Emoji, Message, RetryButton, Wrapper } from "./ErrorState.styles.js";

function ErrorState({
  message = "No pudimos cargar los datos. Revisá tu conexión e intentá de nuevo.",
  onRetry,
}) {
  return (
    <Wrapper>
      <Emoji role="img" aria-hidden="true">
        ⚠️
      </Emoji>
      <Message>{message}</Message>
      {onRetry && <RetryButton onClick={onRetry}>Reintentar</RetryButton>}
    </Wrapper>
  );
}

export default ErrorState;
