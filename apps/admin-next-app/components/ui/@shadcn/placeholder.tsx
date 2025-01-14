import React from 'react';

interface PlaceholderImageProps {
  width: number;
  height: number;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ width, height }) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#cccccc" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#333333"
        fontSize="16"
        fontFamily="Arial, sans-serif"
      >
        {width}x{height}
      </text>
    </svg>
  );
};

export { PlaceholderImage };
