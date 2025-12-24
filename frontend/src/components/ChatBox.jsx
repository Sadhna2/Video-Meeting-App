import React, { useRef, useState } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styles from "../styles/videoComponent.module.css";

export default function ChatComponent({
  messages,
  message,
  setMessage,
  sendMessage,
  closeChat,
  username
}) {

  const [visibleCount, setVisibleCount] = useState(10);
  const chatDisplayRef = useRef(null);

  const handleScroll = () => {
    if (chatDisplayRef.current.scrollTop === 0 && visibleCount < messages.length) {
      setVisibleCount(prev => Math.min(prev + 10, messages.length));
    }
  };

  const displayedMessages = messages.slice(-visibleCount);

  return (
    <div className={styles.chatContainer}>
      <div style={{
        display: 'flex',
        
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #ddd',
        padding: '10px 0'
      }}>
        <h2 style={{ margin: 0 }}>Chat</h2>
        <IconButton onClick={closeChat}>
          <CloseIcon />
        </IconButton>
      </div>

      <div
        ref={chatDisplayRef}
        onScroll={handleScroll}
        className={styles.chattingDisplay}
        
      >
        {displayedMessages.length > 0 ? (
          displayedMessages.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                backgroundColor: item.sender === username ? '#DCF8C6' : '#fff',
                padding: '8px 12px',
                borderRadius: '10px',
                maxWidth: '80%',
                alignSelf: item.sender === username ? 'flex-end' : 'flex-start',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              <p style={{ margin: 0, fontWeight: "bold", fontSize: '0.9rem' }}>{item.sender}</p>
              <p style={{ margin: 0, fontSize: '0.95rem' }}>{item.data}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#999' }}>No Messages Yet</p>
        )}
      </div>

      <div className={styles.chattingArea} style={{
        width: '100%',
        display: 'flex',
        gap: '10px',
        padding: '10px 0',
        background: 'white'
      }}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="Enter Your Chat"
          variant="outlined"
          size="small"
        />
        <Button variant='contained' onClick={sendMessage}>Send</Button>
      </div>
    </div>
  )
}
