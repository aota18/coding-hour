import axios from 'axios'

export const register = newUser => {
    return axios
    .post('user/register', {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
    })
    .then(response => {
        console.log('Registered')
    })
}

export const login = user => {
    return axios
    .post('user/login', {
        email: user.email,
        password: user.password
    })
    .then(response => {
        localStorage.setItem('usertoken', response.data)
        return response.data
    })
    .catch(err => {
        console.log(err)
    })
}

export const getProfile = user => {
    return axios
    .get('user/profile', {
        headers: { Authroization: '${this.getToken()}' }
    })
    .then(response => {
        console.log(response)
        return response.data
    })
    .catch(err => {
        console.log(err)
    })
}