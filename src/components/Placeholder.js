import React from 'react';

export default function PL({children}) {
  return (
    <span
      style={{
        color: '#E3116C',
        fontStyle: 'italic',
        fontWeight: 'bold',
      }}>
      {children}
    </span>
  );
}
