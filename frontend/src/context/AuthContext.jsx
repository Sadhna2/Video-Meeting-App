import { createContext, useEffect, useState } from "react";
import {
  register as registerService,
  login as loginService,
  getUserHistory,
  addToUserHistory,
  // createMeeting as createMeetingService,
  // checkMeeting as checkMeetingService
} from '../services/AuthService';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ for handling refresh and first load

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(storedUser);
    setLoading(false); // ✅ done loading, whether token exists or not
  }, []);

  // Register
  const register = async (name, username, password) => {
    return await registerService(name, username, password);
  };

  // Login
  const login = async (username, password) => {
    setLoading(true); // ✅ show loading before login begins
    const response = await loginService(username, password);
    if (response.status === 200) {
      setToken(response.data.token);
      
      setUser({ name: response.data.name, username: response.data.username });
localStorage.setItem('user', JSON.stringify({ name: response.data.name, username: response.data.username }));

      localStorage.setItem('token', response.data.token);
      
    }
    setLoading(false); // ✅ hide loading after login completes
    return response;
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Fetch user history
  const fetchHistory = async () => {
    if (!token) throw new Error('No token available');
    const response = await getUserHistory(token);
    return response.data;
  };

  // Add meeting
  const addMeeting = async (meetingCode) => {
    if (!token) throw new Error('No token available');
    return await addToUserHistory(token, meetingCode);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        register,
        fetchHistory,
        addMeeting,
        loading // ✅ Exposed here for use in App.js or anywhere
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
