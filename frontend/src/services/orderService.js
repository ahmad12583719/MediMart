import axios from 'axios';

const API_URL = 'http://localhost:5000/api/orders';

export const getOrders = () => {
  return axios.get(API_URL);
};
