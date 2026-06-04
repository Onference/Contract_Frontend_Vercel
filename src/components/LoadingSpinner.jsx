import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={styles.container} aria-label="Loading" role="status">
      <div style={styles.spinner}></div>

      <style>
        {`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  spinner: {
    width: '56px',
    height: '56px',
    border: '5px solid #e5e7eb',
    borderTop: '5px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
};

export default LoadingSpinner;