import Axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_SERVER  || "http://localhost:8080";

const apiBackend = Axios.create({
    baseURL: apiUrl,
})

export default apiBackend