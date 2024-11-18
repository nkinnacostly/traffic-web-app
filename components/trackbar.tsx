// components/ProgressTrackbar.tsx
import { FC } from 'react';

interface ProgressTrackbarProps {
  progress: number; 
  label?: string; 
}

const ProgressTrackbar: FC<ProgressTrackbarProps> = ({ progress, label }) => {
  return (
    <div className="w-full mx-auto p-2">
      {label && <div className="text-sm font-semibold text-gray-700 mb-1">{label}</div>}
      <div className="relative w-full h-2 bg-gray-200 rounded-full">
        <div
          style={{ width: `${progress}%` }}
          className={`absolute top-0 left-0 h-full bg-green-500 rounded-full transition-width duration-300`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressTrackbar;
