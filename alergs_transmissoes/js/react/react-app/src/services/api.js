import axios from 'axios';

const api = axios.create({
	baseURL: 'http://172.30.3.36:8080/alergsws/rest'
});

export default api;