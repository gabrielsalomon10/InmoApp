
import axios from 'axios';


const inmoApi = axios.create({
    baseURL:'/api'
}); 


export default inmoApi;