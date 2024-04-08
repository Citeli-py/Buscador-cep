//https://viacep.com.br/ws/CEP/json

import axios from "axios";


const api = axios.create({
    baseURL: "https://viacep.com.br/ws/"
})

export default api;