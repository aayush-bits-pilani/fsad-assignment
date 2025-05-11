import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

export const login = (data) => API.post('/auth/login', data);
export const getStudents = () => API.get('/students');
export const upsertStudent = (data) => API.post('/students', data);
export const uploadCSV = (formData) => API.post('/students/upload', formData);
export const vaccinateStudent = (data) => API.post('/students/vaccinate', data);
export const createDrive = (data) => API.post('/drives', data);
export const getDrives = () => API.get('/drives/upcoming');
export const updateDrive = (id, data) => API.put(`/drives/${id}`, data);
export const getReport = () => API.get('/reports');
export const exportReportCSV = () => API.get('/reports/export/csv');
