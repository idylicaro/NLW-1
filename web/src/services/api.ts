import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333', // a url que se repete em todas as requisiçoes
});

export default api;