import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_URL + '/api/v1'; 

export const register = (name, username, password) =>
  axios.post(`${BASE_URL}/users/register`, { name, username, password });

export const login = (username, password) =>
  axios.post(`${BASE_URL}/users/login`, { username, password });

export const getUserHistory = (token) =>
  axios.get(`${BASE_URL}/meetings/get_all_activities`, { params: { token } });

export const addToUserHistory = (token, meetingCode) =>
  axios.post(`${BASE_URL}/meetings/add_to_activity`, { token, meetingCode });



// export const createMeeting = (token, meetingCode) =>
//   axios.post(`${BASE_URL}/meetings/create`, { token, meetingCode });

// export const checkMeeting = (meetingCode) =>
//   axios.get(`${BASE_URL}/meetings/check/${meetingCode}`);
