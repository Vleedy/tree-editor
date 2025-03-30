import axios from 'axios';

const API_BASE_URL = 'https://test.vmarmysh.com/';

export const clientApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
