import axios from 'axios'
import { ENV } from '../config'

const config = { headers: { 'Authorization': `Bearer ${ENV.API_KEY}`,'Content-Type':'application/json' } }


export const fetchMostUsedExercise = async () => {
    return await axios.get(`https://api.airtable.com/v0/appi3PlU6gNbXrUVw/Exercises?sort%5B0%5D%5Bfield%5D=Uses&sort%5B0%5D%5Bdirection%5D=desc&maxRecords=8`, config)
        .then((response) => response.data.records)
        .catch((error) => { return { error: error.response.statusText } })
}
export const fetchBreak = async () => {

    return await axios.get(`${ENV.EXERCISES_URL}?filterByFormula=FIND(%22Break%22%2C+%7BName%7D)+%3E+0`, config)
        .then(response => response.data.records)
        .catch(error => { return { error: error.response.statusText } })
}
export const fetchSearch = async (search) => {
    return await axios.get(`${ENV.EXERCISES_URL}?filterByFormula=FIND(%22${search}%22%2C+%7BName%7D)+%3E+0`, config)
        .then(response => response.data.records)
        .catch(error => { return { error: error.response.statusText } })
}
export const saveRequet = async (records) => {

    return await axios.post(`${ENV.WORKOUT_URL}`, { 'records': [{ ...records }],"typecast": true}, config)
        .then((response) => response.statusText)
        .catch((error) => { return { error: error.response.statusText } })
}
