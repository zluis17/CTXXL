import React from 'react';

export function Card({ children, className, ...props }) {
  return (
    <div className={`bg-black border border-gray-800 rounded-lg shadow-lg ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h2 className={`text-2xl font-bold text-white ${className}`} {...props}>
      {children}
    </h2>
  );
}