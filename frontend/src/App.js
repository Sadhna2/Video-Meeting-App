import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import your page components
import { AuthProvider, AuthContext } from './context/AuthContext';
import Landing from './pages/Landing';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import VideoMeet from './pages/VideoMeet';
import History from './pages/History';
import NotFound from './pages/NotFound';
import PrivateRoute from './utils/PrivateRoute';

// This component waits for token/user restoration
const AppRoutes = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/meeting/:roomId"
        element={
          <PrivateRoute>
            <VideoMeet />
          </PrivateRoute>
        }
      />
      <Route
        path="/history"
        element={
          <PrivateRoute>
            <History />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
