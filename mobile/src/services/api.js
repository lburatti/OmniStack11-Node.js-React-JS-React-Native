import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.15.12:3333' // IP do computador, disponivel na url do servidor mobile (localhost:19002)
});

export default api;
