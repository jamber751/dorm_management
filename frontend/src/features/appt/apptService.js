import axios from 'axios'
import { getCSRF } from '../auth/authService'

const APPT_URL = 'appt/'

async function getAppts(userData) {
    const config = await getCSRF()
    const response = await axios.post(APPT_URL + 'get', userData, config)
    return response.data
}

async function bookAppt(userData) {
    const config = await getCSRF()
    const response = await axios.post(APPT_URL + 'book', userData, config)
    return response.data
}

async function myAppts(userData) {
    const config = await getCSRF()
    const response = await axios.get(APPT_URL + 'my', userData, config)
    return response.data
}

async function cancelAppt(userData) {
    const config = await getCSRF()
    const response = await axios.post(APPT_URL + 'cancel', userData, config)
    return response.data
}

const apptService = {
    getAppts,
    bookAppt,
    myAppts,
    cancelAppt
}

export default apptService
