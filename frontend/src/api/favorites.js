import axiosInstance from "./axios";

const API_URL = 'http://localhost:5000/api/favorites'; // Базовый URL вашего API для избранных промтов

export const addToFavorites = async (promptId) => {
    try {
        await axiosInstance.post(`${API_URL}/${promptId}`);
    } catch (error) {
        throw error;
    }
};

export const removeFromFavorites = async (promptId) => {
    try {
        await axiosInstance.delete(`${API_URL}/${promptId}`);
    } catch (error) {
        throw error;
    }
};