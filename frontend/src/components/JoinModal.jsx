import React, { useState } from 'react';

export default function JoinModal({ onJoin }) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) {
      onJoin(name.trim());
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '8px',
          textAlign: 'center',
          width: '300px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
      >
        <h2 style={{ marginBottom: '1rem' }}>Enter your name to join</h2>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your Name"
          style={{
            marginBottom: '1rem',
            padding: '0.5rem',
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
        <button type="submit" style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Join
        </button>
      </form>
    </div>
  );
}
