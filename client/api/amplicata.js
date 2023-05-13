import axios from 'axios';
//import { getAuth, removeAuth } from "@/store/local.store"; 

const amplicataApi = axios.create({
  baseURL: API_URL //import.meta.env.apiUrl //
})

// Request interceptor for API calls
//http.interceptors.request.use(
//  async (config) => {
//    config.headers = {
//      Accept: "application/json",
//    };s
//    
//    if (config.data instanceof FormData) {
//      config.headers["Content-Type"] = `multipart/form-data; boundary=${config.data._boundary}`;
//    }
//
//    const auth = getAuth();
//    if (auth?.access?.token){
//      config.headers["Authorization"] = `Bearer ${auth.access.token}`;
//    }   
//
//    return config;
//  },
//  (error) => {    
//    Promise.reject(error);
//  }
//);

// Response interceptor for API calls
//http.interceptors.response.use(
//  (response) => {
//    return response;
//  },
//  async function (error) {  
//          
//    const originalRequest = error.config;
//    if (error.response && error.response.status === 401 && !originalRequest._retry) {      
//      removeAuth();
//      return Promise.reject(error.response.data);
//    }  
//    
//    return Promise.reject(error.response.data);
//  }
//); 

export { amplicataApi }; 