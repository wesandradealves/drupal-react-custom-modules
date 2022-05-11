import axios from 'axios';

const api = axios.create({
	baseURL: 'http://172.30.3.36:8080/alergsws/rest'
});

// axios.interceptors.request.use(async config => {
//     console.log('Request was sent');
//     const token = localStorage.getItem('token');
  
//     if (token) {
//         api.defaults.headers.authorization = `Bearer ${token}`;
//     }

//     return config;
//   }, error => {
//     return Promise.reject(error);
//   });

export default api;

