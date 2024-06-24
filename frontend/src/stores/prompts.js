import { create } from 'zustand';
import axios from 'axios';
import {
    createPrompt,
    getPromptById,
    updatePromptById,
    deletePromptById,
    addLike,
    deleteLike,
    updateLike,
    getLike,
    addComment,
    deleteComment
} from '../api/prompts';
import axiosInstance from '../api/axios';

const usePromptStore = create((set, get) => ({
    prompts: [],
    isLoading: false,
    error: null,
    currentPrompt: null,
    user: JSON.parse(localStorage.getItem('user')) || null,

    fetchPrompts: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get('http://localhost:5000/api/prompts');
            const promptData = await response.data;
            console.log(promptData);
            set({ prompts: promptData, isLoading: false });
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
    fetchPromptById: async (promptId) => {
        set({ isLoading: true, error: null });
        try {
            const promptData = await getPromptById(promptId);
            set({ currentPrompt: promptData, isLoading: false }); // Сохраняем данные промпта в currentPrompt
            return promptData;
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },
    setPrompts: (newPrompts) => set({ prompts: newPrompts }),
    addPrompt: async (promptData, navigate, selectedTags) => {
        set({ isLoading: true, error: null });
        try {
            const newPrompt = await createPrompt(promptData); // Создаем промпт
            console.log(newPrompt);
            console.log(selectedTags);
            if (selectedTags.length > 0) {
                selectedTags.forEach(async (tag) => {
                    await axiosInstance.post(
                        `http://localhost:5000/api/prompts/${newPrompt.id}/tags`,
                        { name: tag },
                    );
                });
            }
            set({ isLoading: false });
            await navigate('/');
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },

    updatePrompt: async (promptId, promptData, navigate, selectedTags) => {
        set({ isLoading: true, error: null });
        try {
            const newPrompt = await updatePromptById(promptId, promptData);
            console.log(newPrompt);
            console.log(selectedTags);
            console.log(promptData);
            if (selectedTags.length > 0) {
                selectedTags.forEach(async (tag) => {
                    if (!newPrompt.Tags.some((t) => t.name === tag)) {
                        await axiosInstance.post(
                            `http://localhost:5000/api/prompts/${newPrompt.id}/tags`,
                            { name: tag },
                        );
                    }
                });
            }
            set({ isLoading: false });
            // Обновляем список промптов после редактирования
            await navigate('/profile');
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },

    deletePrompt: async (promptId) => {
        set({ isLoading: true, error: null });
        try {
            await deletePromptById(promptId);
            set({ isLoading: false });
            // Обновляем список промптов после удаления
            get().fetchPrompts();
        } catch (error) {
            set({ error: error.response.data.error || error.message, isLoading: false });
        }
    },

    //Лайки/Дизлайки
    handleLike: async (promptId) => {
        try {
            // Получаем лайк пользователя
            const existingLike = await getLike(promptId);

            if (existingLike) {
                if (existingLike.type === 'like') {
                    // Удаляем лайк
                    await deleteLike(existingLike.id);
                } else {
                    // Обновляем дизлайк на лайк
                    await updateLike(existingLike.id, 'like');
                }
            } else {
                // Добавляем новый лайк
                await addLike(promptId, 'like');
            }

            get().fetchPrompts(); // Обновляем список промптов
        } catch (error) {
            console.error('Ошибка при обработке лайка:', error);
        }
    },

    handleDislike: async (promptId) => {
        try {
            // Получаем лайк пользователя
            const existingLike = await getLike(promptId);

            if (existingLike) {
                if (existingLike.type === 'dislike') {
                    // Удаляем дизлайк
                    await deleteLike(existingLike.id);
                } else {
                    // Обновляем лайк на дизлайк
                    await updateLike(existingLike.id, 'dislike');
                }
            } else {
                // Добавляем новый дизлайк
                await addLike(promptId, 'dislike');
            }

            get().fetchPrompts(); // Обновляем список промптов
        } catch (error) {
            console.error('Ошибка при обработке дизлайка:', error);
        }
    },

    //Комментарии
    handleAddComment: async (promptId, content) => {
        try {
            await addComment(promptId, content);
            get().fetchPrompts(); // Обновляем список промптов
        } catch (error) {
            console.error('Ошибка при добавлении комментария:', error);
        }
    },

    handleDeleteComment: async (commentId) => {
        try {
            await deleteComment(commentId);
            get().fetchPrompts(); // Обновляем список промптов
        } catch (error) {
            console.error('Ошибка при удалении комментария:', error);
        }
    },
}));

export default usePromptStore;
