import React from 'react';

export function Input({ className, ...props }) {
  return (
    <input 
      className={`w-full px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} 
      {...props} 
    />
  );
}