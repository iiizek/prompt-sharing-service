import axios from 'axios';
import axiosInstance from './axios';

const API_URL = 'http://localhost:5000/api/users'; // Базовый URL вашего API для пользователей
const API_URL_FAVORITES = 'http://localhost:5000/api/favorites'; // Базовый URL вашего API для избранных промтов
const API_URL_AVATAR = 'http://localhost:5000/api/upload/avatar'; // Базовый URL вашего API для аватарок

export const getUserData = async (userId) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProfile = async (userId, profileData) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${userId}`, profileData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getFavoritePrompts = async (userId) => {
    try {
        const response = await axiosInstance.get(`${API_URL_FAVORITES}`);
        const favorites = response.data;
		let prompts = [];
		favorites.forEach( async (favorite) => {
			const response = await axiosInstance.get(`http://localhost:5000/api/prompts/${favorite.promptId}`);
			prompts.push(response.data);
		})
		return prompts;
    } catch (error) {
        throw error;
    }
};

export const uploadAvatar = async (avatarFile) => {
    try {
        const formData = new FormData();
        formData.append('avatar', avatarFile);

        const response = await axiosInstance.post(API_URL_AVATAR, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.url; // Возвращаем URL загруженной аватарки
    } catch (error) {
        throw error;
    }
};
