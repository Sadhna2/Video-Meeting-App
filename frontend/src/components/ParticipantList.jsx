import React from 'react';

export default function ParticipantList({ users = [], username }) {
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: '200px',
      background: '#f8f8f8',
      borderRight: '1px solid #ccc',
      padding: '1rem',
      overflowY: 'auto',
      zIndex: 10
    }}>
      <h3>Participants</h3>
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0
      }}>
        <li key="you" style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
          {username ? `(You) ${username}` : 'You'}
        </li>
        {users.map((userId) => (
          <li key={userId} style={{ marginBottom: '0.5rem' }}>
            {userId}
          </li>
        ))}
      </ul>
    </div>
  );
}
