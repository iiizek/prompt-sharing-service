import axiosInstance from './axios';

const API_URL = 'http://localhost:5000/api'; // Базовый URL вашего API

export const getStatistics = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/admin/statistics`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPrompts = async () => {
    try {
        const response = await axiosInstance.get(`${API_URL}/prompts`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        await axiosInstance.delete(`${API_URL}/users/${userId}`);
    } catch (error) {
        throw error;
    }
};

export const deletePromptById = async (promptId) => {
    try {
        await axiosInstance.delete(`${API_URL}/prompts/${promptId}`);
    } catch (error) {
        throw error;
    }
};
