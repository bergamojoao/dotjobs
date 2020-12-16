import axios from 'axios';

const api = axios.create({
    baseURL:'https://dot-jobs-api.herokuapp.com'
})

export default api;