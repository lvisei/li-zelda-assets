import React from 'react';

export const Stamp = () => {
  return (
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <g
        transform="rotate(33 100 100) scale(0.715) translate(28.5, 28.5)"
        style={{ color: 'rgba(82, 196, 26, 0.6)' }}
      >
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="6" fill="none" />
        <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="3" fill="none" />
        <text
          x="100"
          y="113"
          fill="currentColor"
          fontSize="28"
          fontWeight="bold"
          textAnchor="middle"
        >
          Complete
        </text>
        <path
          id="lower-arc"
          d="M 40,105 A 60,60 0 0 0 160,105"
          fill="none"
          stroke="none"
          strokeWidth="2"
        />
        <path d="M 60,80 A 50,50 0 0 1 140,80" fill="none" stroke="currentColor" strokeWidth="3" />
        <path
          d="M 60,125 A 50,50 0 0 0 140,125"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
};
