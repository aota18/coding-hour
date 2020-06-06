import axios from 'axios';

const addr = process.env.NODE_ENV == 'production' ? 'http://13.209.70.185' : 'http://localhost'
let port='3001';



export const createClass = ({classname, userId, year, semester, role}) => axios.post(`${addr}:${port}/api/class/register`, {classname, userId, year, semester, role});
export const joinClass = ({classId, userId}) => axios.post(`${addr}:${port}/api/class/join`, {classId, userId});
export const settingClass = ({classname, year, semester}) => axios.post(`${addr}:${port}/api/class/settings`, {classname, year, semester});

export const classByName = (name) => axios.get(`${addr}:${port}/api/class/name/` + name);
export const classByUser = (userId) => axios.get(`${addr}:${port}/api/account/${userId}/classes`);
export const classByClassId = (classId) => axios.get(`${addr}:${port}/api/class/` + classId);

// account.get('/:user/classes', accountCtrl.getClass);
// account.get('/:user', accountCtrl.getUser)

// clazz.post('/register', classCtrl.register);
// clazz.post('/join', classCtrl.join);
// clazz.get('/year/:year/semester/:semester', classCtrl.findByYearAndSemester);
// clazz.get('/name/:name', classCtrl.findByClassName);
// clazz.put('/:classId', classCtrl.edit);
// clazz.delete('/:classId', classCtrl.delete);