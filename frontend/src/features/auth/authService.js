import axios from 'axios'
import Cookies from 'js-cookie'
const AUTH_URL = 'auth/'

export const getCSRF = async() => {
    await axios.get(AUTH_URL + "csrf")
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
    return config
}

async function register(userData) {
    const response = await axios.post(AUTH_URL + 'register', userData)
    return response.data
}

async function login(userData) {
    const response = await axios.post(AUTH_URL + 'login', userData)
    return response.data
}

async function logout(userData) {
    const config = await getCSRF()
    const response = await axios.post(AUTH_URL + 'logout', userData, config)
    return response.data
}

async function isAuth() {
    const response = await axios.get(AUTH_URL + 'check')
    return response.data
}

const authService = {
    register,
    login,
    logout,
    isAuth
}

export default authService