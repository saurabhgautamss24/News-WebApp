
import React from 'react';

interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message = 'Something went wrong', 
  onRetry 
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onRetry) {
      onRetry();
    }
  };

  return (
    <div className="error-message">
      <p>{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          onKeyDown={handleKeyDown}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;