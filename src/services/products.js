import axios from 'axios';

const API_URL = "https://gouwrwclaopmvzimokbe.supabase.co/rest/v1/products";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvdXdyd2NsYW9wbXZ6aW1va2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NzU2MzksImV4cCI6MjA2NTU1MTYzOX0.q9w_2T92r9qaQDLPWlmNvxtJx3xwSqwUg0imNh7Xjss";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
};

export const products = {
  async fetchAll() {
    const response = await axios.get(`${API_URL}?order=created_at.desc`, { headers });
    return response.data;
  },

  async fetchById(id) {
    const response = await axios.get(`${API_URL}?id=eq.${id}`, { headers });
    return response.data[0]; // Supabase returns array
  },

  async create(data) {
    const response = await axios.post(API_URL, data, { headers });
    return response.data[0]; // Usually returns created object
  },

  async update(id, data) {
    const response = await axios.patch(`${API_URL}?id=eq.${id}`, data, { headers });
    return response.data[0];
  },

  async delete(id) {
    await axios.delete(`${API_URL}?id=eq.${id}`, { headers });
  }
};
