// import axios from 'axios'

// import './Auth/Register/node_modules/react-toastify/dist/ReactToastify.css';

// const addr = process.env.NODE_ENV == 'production' ? 'http://13.209.70.185' : 'http://localhost'

// let port='3001';

// export const register = newUser => {
//     return axios
//     .post(`${addr}:${port}/api/auth/register`, {
//         username: newUser.username,
//         email: newUser.email,
//         password: newUser.password
//     })
//     .then(response => {
//         console.log(response);
//         console.log('Registered')
//     })
// }

// export const login = user => {
//     return axios
//     .post(`${addr}:${port}/api/auth/login`, {
//         email: user.email,
//         password: user.password
//     })
//     .then(response => {
//         localStorage.setItem('usertoken', response.data.token)
//         return response.data
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

// export const getProfile = id => {
//     return axios
//     .get(`${addr}:${port}/api/user/profile/${id}`)
//     .then(response => {
//         console.log(response)
//         return response.data
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }