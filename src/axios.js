import axios from "axios";
import router from "./router";

const axiosClient = axios.create(
    {
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
    })

axiosClient.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`
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