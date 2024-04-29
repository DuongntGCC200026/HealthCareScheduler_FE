// src/StatusIndicator.jsx

import React from 'react';

function StatusIndicator() {
  const isDevServerRunning = process.env.NODE_ENV === 'development';

  return (
    <div>
      {isDevServerRunning ? (
        <h2>The development server is running!</h2>
      ) : (
        <h2>The development server is not running.</h2>
      )}
    </div>
  );
}

export default StatusIndicator;
