import React from 'react';

export function Button({ children, className, variant, ...props }) {
  const baseClass = "px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClass = variant === "outline" 
    ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700" 
    : "bg-purple-600 text-white hover:bg-purple-700 ";

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}