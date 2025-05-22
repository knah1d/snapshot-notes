import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card = ({ title, children, className = '' }: CardProps) => {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}>
      {title && <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

export default Card;
