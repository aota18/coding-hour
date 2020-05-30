import axios from 'axios';

const addr = process.env.NODE_ENV == 'production' ? 'http://13.209.70.185' : 'http://localhost'
let port='3001';



export const createClass = ({classname, _id, year, semester, role}) => axios.post(`${addr}:${port}/api/class/register`, {classname, _id, year, semester, role});
export const joinClass = ({classId, _id}) => axios.post(`${addr}:${port}/api/class/join`, {classId, _id});

export const classByName = (name) => axios.get(`${addr}:${port}/api/class/name/` + name);
// clazz.post('/register', classCtrl.register);
// clazz.post('/join', classCtrl.join);
// clazz.get('/year/:year/semester/:semester', classCtrl.findByYearAndSemester);
// clazz.get('/name/:name', classCtrl.findByClassName);
// clazz.put('/:classId', classCtrl.edit);
// clazz.delete('/:classId', classCtrl.delete);