import { create } from 'zustand';
import { getStatistics, getUsers, getPrompts, deleteUser, deletePromptById } from '../api/admin';

const useAdminStore = create((set, get) => ({
    statistics: null,
    users: [],
    prompts: [],
    isLoading: false,
    error: null,

    fetchStatistics: async () => {
        set({ isLoading: true, error: null });
        try {
            const statisticsData = await getStatistics();
            set({ statistics: statisticsData, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const usersData = await getUsers();
            set({ users: usersData, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },

    fetchPrompts: async () => {
        set({ isLoading: true, error: null });
        try {
            const promptsData = await getPrompts();
            set({ prompts: promptsData, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },

    deleteUser: async (userId) => {
        try {
            await deleteUser(userId);
            get().fetchUsers(); // Обновляем список пользователей
        } catch (error) {
            console.error('Ошибка при удалении пользователя:', error);
        }
    },

    deletePrompt: async (promptId) => {
        try {
            await deletePromptById(promptId);
            get().fetchPrompts(); // Обновляем список промптов
        } catch (error) {
            console.error('Ошибка при удалении промпта:', error);
        }
    },
}));

export default useAdminStore;
