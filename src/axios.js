import axios from "axios";
import router from "./router";

const axiosClient = axios.create(
    {
    baseURL: `http://localhost:8000/api`
    })

axiosClient.interceptors.request.use((config) =>{
    const token ='123'
    config.headers.Authorization = `Bearer ${token}`
    return config
})

axiosClient.interceptors.response.use(response => {
    return response;
},err => {
    if (err.response && err.response.status === 401) {
        router.navigate('/login')
        return err;
    }
    throw err;
})
export default axiosClient