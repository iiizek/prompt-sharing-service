import { create } from 'zustand';
import { getTags } from '../api/tags';

const useTagStore = create((set) => ({
    tags: [],
    isLoading: false,
    error: null,

    fetchTags: async () => {
        set({ isLoading: true });
        try {
            const tagsData = await getTags();
            set({ tags: tagsData, isLoading: false });
			console.log(tagsData);
        } catch (error) {
            set({ error: error.message, isLoading: false });
        }
    },
}));

export default useTagStore;
