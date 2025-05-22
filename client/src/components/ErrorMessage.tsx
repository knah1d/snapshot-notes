import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry, className = '' }) => {
  return (
    <div className={`mb-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded ${className}`}>
      <p className="font-medium mb-1">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-blue-600 hover:text-blue-800 underline text-sm mt-1"
          type="button"
        >
          Try again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
