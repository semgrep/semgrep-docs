import React from 'react';

export default function Tags({tag}) {
  return (
    <span style={{
      backgroundColor: '#ffc0cb',
      borderRadius: '8px',
      color: '#000',
      padding: '0.4rem',
    }}>
    {tag}
    </span>
  );
}
