import axios from 'axios';

const imgur = axios.create({
    baseURL: 'https://api.imgur.com/3'
})

export default imgur;