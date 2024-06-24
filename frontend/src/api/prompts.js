import axios from 'axios';
import axiosInstance from './axios';
import useAuthStore from '../stores/auth';

const API_URL = 'http://localhost:5000/api/prompts'; // Базовый URL вашего API
const API_URL_SEARCH = 'http://localhost:5000/api/search'; // URL вашего API для поиска

export const getPrompts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getPromptById = async (promptId) => {
    try {
        const response = await axiosInstance.get(`${API_URL}/${promptId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createPrompt = async (promptData) => {
    try {
        const response = await axiosInstance.post(`${API_URL}`, promptData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Важно для загрузки файлов
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePromptById = async (promptId, promptData) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${promptId}`, promptData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletePromptById = async (promptId) => {
    try {
        await axiosInstance.delete(`${API_URL}/${promptId}`);
    } catch (error) {
        throw error;
    }
};

export const searchPrompts = async (searchTerm, tags) => {
    try {
        const response = await axios.get(API_URL_SEARCH, {
            params: {
                query: searchTerm,
                tags: tags.join(','),
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Лайки/Дизлайки
export const getLike = async (promptId) => {
    try {
        const response = await axiosInstance.get(`http://localhost:5000/api/prompts/${promptId}/likes`);
        // Find the user's like among all likes for the prompt
        const userLike = response.data.find(
            (like) => like.userId === useAuthStore.getState().user.id,
        );
        return userLike;
    } catch (error) {
        throw error;
    }
};

export const addLike = async (promptId, type) => {
    try {
        const response = await axiosInstance.post(`http://localhost:5000/api/prompts/${promptId}/likes`, { type });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateLike = async (likeId, type) => {
    try {
        const response = await axiosInstance.put(`http://localhost:5000/api/likes/${likeId}`, { type });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteLike = async (likeId) => {
    try {
        await axiosInstance.delete(`http://localhost:5000/api/likes/${likeId}`);
    } catch (error) {
        throw error;
    }
};

//Комментарии
export const addComment = async (promptId, content) => {
    try {
        const response = await axiosInstance.post(`http://localhost:5000/api/prompts/${promptId}/comments`, { content });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteComment = async (commentId) => {
    try {
        await axiosInstance.delete(`http://localhost:5000/api/comments/${commentId}`);
    } catch (error) {
        throw error;
    }
};
