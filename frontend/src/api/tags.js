import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tags'; // Базовый URL вашего API для тегов

export const getTags = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};
