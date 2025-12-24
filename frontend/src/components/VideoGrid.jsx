import React, { useRef, useEffect } from 'react';

export default function VideoGrid({ localStream, remoteStreams, localVideoRef }) {
  const remoteVideoRefs = useRef({});

  useEffect(() => {
    // Attach remote streams
    remoteStreams.forEach(remote => {
      if (remoteVideoRefs.current[remote.id]) {
        remoteVideoRefs.current[remote.id].srcObject = remote.stream;
      }
    });
  }, [remoteStreams]);

  return (
    <div className="video-grid" style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      padding: '1rem',
      background: '#111',
      minHeight: '100vh'
    }}>
      
      {localStream && (
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          style={{
            width: '300px',
            border: '3px solid green',
            borderRadius: '8px'
          }}
        />
      )}

      {remoteStreams.map(remote => (
        <video
          key={remote.id}
          ref={el => { if (el) remoteVideoRefs.current[remote.id] = el; }}
          autoPlay
          playsInline
          style={{
            width: '300px',
            border: '3px solid red',
            borderRadius: '8px'
          }}
        />
      ))}
    </div>
  );
}
