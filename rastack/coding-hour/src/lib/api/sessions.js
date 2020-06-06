import axios from 'axios';

const addr = process.env.NODE_ENV == 'production' ? 'http://13.209.70.185' : 'http://localhost'
let port='3001';



export const createSession = ({classId, userId, date}) => axios.post(`${addr}:${port}/api/session`, {classId, userId, date});
export const willjoinSession = (sessionId, userId) => axios.put(`${addr}:${port}/api/session/${sessionId}/willjoin/${userId}`);

export const sessionByClass = ({classId, userId}) => axios.get(`${addr}:${port}/api/class/${classId}/${userId}/sessions`);
export const sessionBySessionId = (sessionId) => axios.get(`${addr}:${port}/api/session/` + sessionId);

export const sessionAttendance = ({attended}, sessionId) => axios.post(`${addr}:${port}/api/session/${sessionId}/attend`, {attended});

// attendance
// session.post('/:sessionId/attend', sessionCtrl.addAttendUsers);


