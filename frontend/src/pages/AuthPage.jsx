import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { AuthContext } from '../context/AuthContext';

const defaultTheme = createTheme();

export default function AuthPage() {
  const { register: registerContext, login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [formState, setFormState] = useState(0); // 0 = login, 1 = register
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const clearFields = () => {
    setName('');
    setUsername('');
    setPassword('');
    setError('');
  };

  const handleAuth = async () => {
    try {
      setError('');

      if (formState === 0) {
        // Login
        if (!username || !password) {
          setError('Please fill all fields');
          return;
        }

        await loginContext(username, password);
        setMessage('Login successful!');
        // setSnackbarOpen(true);
        clearFields();
        navigate('/home');
      }

      if (formState === 1) {
        // Register
        if (!name || !username || !password) {
          setError('Please fill all fields');
          return;
        }

        const result = await registerContext(name, username, password);
        const successMessage = result?.data?.message || 'Registered successfully! Please login.';

        setMessage(successMessage);
        setSnackbarOpen(true);
        clearFields();
        setFormState(0);
      }
    } catch (err) {
      console.error('Auth error:', err);
      const msg =
        err?.response?.data?.message || 'Something went wrong. Please try again.';
      setError(msg);
    }
  };

  // Clear error as user types
  const handleFieldChange = (setter) => (e) => {
    setter(e.target.value);
    setError('');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/1600x900/?video,call,technology)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant={formState === 0 ? 'contained' : 'outlined'}
                onClick={() => {
                  setFormState(0);
                  clearFields();
                }}
              >
                Sign In
              </Button>
              <Button
                variant={formState === 1 ? 'contained' : 'outlined'}
                onClick={() => {
                  setFormState(1);
                  clearFields();
                }}
              >
                Sign Up
              </Button>
            </Box>

            <Box component="form" noValidate sx={{ mt: 3, width: '100%' }}>
              {formState === 1 && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  value={name}
                  onChange={handleFieldChange(setName)}
                  autoComplete="name"
                />
              )}

              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={username}
                onChange={handleFieldChange(setUsername)}
                autoComplete="username"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={handleFieldChange(setPassword)}
                autoComplete="current-password"
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleAuth}
              >
                {formState === 0 ? 'Login' : 'Register'}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={message}
      />
    </ThemeProvider>
  );
}
