import React from 'react';

const Login = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #f7f8fa 0%, #eef1f5 100%)',
        padding: '24px',
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#fff',
          border: '1px solid rgba(16, 24, 40, 0.08)',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(16, 24, 40, 0.08)',
          padding: '32px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <a
          href={`${import.meta.env.VITE_BACKEND_SERVER}/login/microsoft`}
          style={{
            width: '100%',
            height: '54px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            background: '#fff',
            color: '#111827',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 600,
            borderRadius: '14px',
            border: '1px solid rgba(16, 24, 40, 0.12)',
            boxShadow: '0 1px 2px rgba(16, 24, 40, 0.04)',
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft"
            width="20"
            height="20"
            style={{ display: 'block' }}
          />
          <span>Sign in with Microsoft</span>
        </a>
      </div>
    </div>
  );
};

export default Login;