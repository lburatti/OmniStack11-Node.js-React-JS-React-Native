import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333', // parte da URL que tem em todas as paginas
})

export default api;
