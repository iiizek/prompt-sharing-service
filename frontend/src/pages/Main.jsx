import React, { useEffect } from 'react';
import { getPrompts } from '../api/prompts';
import usePromptStore from '../stores/prompts';
import useAuthStore from '../stores/auth';

import Search from '../components/Search';
import PromptCard from '../components/PromptCard';

const Main = () => {
    const { prompts, isLoading, error, fetchPrompts } = usePromptStore();
    const { fetchFavoritePrompts } = useAuthStore();

    useEffect(() => {
        fetchPrompts();
        fetchFavoritePrompts();
    }, []);

    return (
        <div className="flex flex-col overflow-x-hidden h-[100vh]">
            <Search />

            <section className="bg-dark rounded-t-3xl p-[2rem] custom-shadow">
                <h2 className="text-title text-[3.2rem] text-center">Список prompt-ов</h2>
                <ul className="mt-[3rem] mx-[2rem] grid grid-cols-3 gap-[4rem] justify-evenly">
                    {isLoading && 'Загрузка...'}
                    {error && 'Фатальная ошибка сервера!'}
                    {prompts &&
                        prompts.map((prompt) => <PromptCard key={prompt.id} prompt={prompt}/>)}
                </ul>
            </section>
        </div>
    );
};

export default Main;
