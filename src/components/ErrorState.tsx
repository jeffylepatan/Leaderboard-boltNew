import React from 'react';
import { XOctagon } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16 px-4">
      <XOctagon className="w-12 h-12 text-red-500" />
      <p className="mt-4 text-xl font-semibold text-red-600 text-center">{message}</p>
      <button 
        onClick={onRetry}
        className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-full font-medium shadow-lg hover:bg-indigo-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorState;