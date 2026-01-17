import React from "react";

interface FrostedBackgroundProps {
  className?: string;
}

export const FrostedBackground: React.FC<FrostedBackgroundProps> = ({
  className = "",
}) => {
  return (
    <div className={`fixed inset-0 -z-10 pointer-events-none ${className}`}>
      <div className="w-full h-full bg-bg/30 backdrop-blur-2xl rounded-xl shadow-inner" />
    </div>
  );
};
