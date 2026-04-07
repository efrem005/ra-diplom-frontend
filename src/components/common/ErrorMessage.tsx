interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <p>{message || 'Произошла ошибка при загрузке данных'}</p>
      {onRetry && (
        <button className="btn btn-outline-primary" onClick={onRetry}>
          Попробовать снова
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
