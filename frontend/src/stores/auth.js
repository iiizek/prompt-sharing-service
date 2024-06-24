import { create } from 'zustand';
import { registerUser, loginUser } from '../api/auth';
import { getUserData, updateProfile, getFavoritePrompts, uploadAvatar } from '../api/profile';
import { addToFavorites, removeFromFavorites } from '../api/favorites';

const useAuthStore = create((set, get) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: null,
    favorites: [],
    isLoading: false,
    error: null,

    register: async (userData, navigate) => {
        set({ isLoading: true, error: null });
        try {
            const response = await registerUser(userData);
            set({ user: response, isLoading: false });
            navigate('/auth');
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },

    login: async (userData, navigate) => {
        set({ isLoading: true, error: null });
        try {
            const response = await loginUser(userData);
            set({ user: response.user, token: response.token, isLoading: false }); // Сохраняем данные пользователя и токен
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            navigate('/');
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },

    logout: (navigate) => {
        set({ user: null, token: null });
        localStorage.removeItem('token');
        navigate('/auth');
    },

    //Взаимодействие с профилем
    fetchUserData: async (userId) => {
        set({ isLoading: true, error: null });
        try {
            const userData = await getUserData(userId);
            set({ user: userData, isLoading: false });
            localStorage.setItem('user', JSON.stringify(userData));
            console.log(userData);
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },

    updateUserProfile: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const updatedUser = await updateProfile(get().user.id, userData); // Используем id пользователя из хранилища
            set({ user: updatedUser, isLoading: false });
            localStorage.setItem('user', JSON.stringify(updatedUser));
            console.log(updatedUser);
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },

    uploadUserAvatar: async (avatarFile) => {
        set({ isLoading: true, error: null });
        try {
            const avatarUrl = await uploadAvatar(avatarFile);
            // Обновляем аватарку пользователя в хранилище
            set((state) => ({
                user: { ...state.user, avatar: avatarUrl },
                isLoading: false,
            }));
            localStorage.setItem('user', JSON.stringify({ ...get().user, avatar: avatarUrl }));
            console.log(avatarUrl);
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },

    fetchFavoritePrompts: async () => {
        set({ isLoading: true, error: null });
        try {
            const favorites = await getFavoritePrompts();
            set({ favorites: favorites, isLoading: false });
            console.log(favorites);
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },

    //Управление избранными
    addFavorite: async (promptId) => {
        try {
            await addToFavorites(promptId);
            // Обновляем избранные промпты после добавления
            await get().fetchFavoritePrompts(); // Вызываем fetchFavoritePrompts для обновления состояния
        } catch (error) {
            // Обработка ошибки
            console.error('Ошибка добавления в избранное:', error);
        }
    },

    removeFavorite: async (promptId) => {
        try {
            await removeFromFavorites(promptId);
            // Обновляем избранные промпты после удаления
            await get().fetchFavoritePrompts(); // Вызываем fetchFavoritePrompts для обновления состояния
        } catch (error) {
            console.error('Ошибка удаления из избранного:', error);
        }
    },
}));

export default useAuthStore;
