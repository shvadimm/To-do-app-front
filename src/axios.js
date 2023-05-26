import axios from "axios";
import router from "./router";

const axiosClient = axios.create(
    {
    baseURL: `${import.meta.env.API_BASE_URL}/api`
    })

axiosClient.interceptors.request.use((config) =>{
    const token ='123'
    config.headers.Authorization = `Bearer ${token}`
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