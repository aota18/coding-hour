import axios from 'axios';

const addr = process.env.NODE_ENV == 'production' ? 'http://13.209.70.185' : 'http://localhost'
let port='3001';

export const checkEmailExists = (email) => axios.get(`${addr}:${port}/api/auth/exists/email/` + email);
export const checkUsernameExists = (username) => axios.get(`${addr}:${port}/api/auth/exists/username/` + username);

export const localRegister = ({email, username, password}) => axios.post(`${addr}:${port}/api/auth/register/local`, { email, username, password });
export const localLogin = ({email, password}) => axios.post(`${addr}:${port}/api/auth/login/local`, { email, password });

export const checkStatus = () => axios.get(`${addr}:${port}/api/auth/check`);
export const Logout = () => axios.post(`${addr}:${port}/api/auth/logout`);