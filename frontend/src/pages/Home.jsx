import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Box, AppBar, Toolbar, Typography, Button, TextField, Container, Paper } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';

export default function Home() {
    const navigate = useNavigate();
    const { logout, user, } = useContext(AuthContext);
    const [meetingCode, setMeetingCode] = useState('');

    const handleStart = () => {
        const randomId = Math.random().toString(36).substring(2, 9);
        navigate(`/meeting/${randomId}`);

    };

    const handleJoin = () => {
        if (!meetingCode.trim()) return;
        navigate(`/meeting/${meetingCode.trim()}`);

    };

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    const goToHistory = () => {
        navigate('/history');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <VideoCallIcon />
                        <Typography variant="h6" component="div">PaperTalk</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="subtitle1">
                            Welcome, {user?.name || 'User'}!
                        </Typography>

                        <Button color="inherit" onClick={goToHistory}>History</Button>
                        <Button color="inherit" onClick={handleLogout}>Logout</Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="sm" sx={{ mt: 6 }}>
                <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Start or Join a Meeting
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleStart}
                        sx={{ mt: 2, mb: 3, width: '100%' }}
                    >
                        Start New Meeting
                    </Button>

                    <Typography variant="subtitle1" gutterBottom>
                        Or enter a meeting code
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Enter Meeting Code"
                            value={meetingCode}
                            onChange={(e) => setMeetingCode(e.target.value)}
                        />
                        <Button variant="contained" onClick={handleJoin}>Join</Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
