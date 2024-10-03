// src/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_RENDER; // Змініть на ваш URL сервісу

export const fetchContacts = async () => {
    const response = await axios.get(`${API_URL}/contacts`);
    return response.data;
};

export const addContact = async (contact) => {
    const response = await axios.post(`${API_URL}/contacts`, contact);
    return response.data;
};

export const updateContact = async (id, contact) => {
    const response = await axios.put(`${API_URL}/contacts/${id}`, contact);
    return response.data;
};

export const deleteContact = async (id) => {
    await axios.delete(`${API_URL}/contacts/${id}`);
};
