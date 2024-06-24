import React, { useEffect, useState } from 'react';
import useAdminStore from '../stores/admin';
import PromptCard from '../components/PromptCard';
import UserCard from '../components/UserCard'; // Создайте компонент UserCard

const Admin = () => {
    const {
        statistics,
        users,
        prompts,
        isLoading,
        error,
        fetchStatistics,
        fetchUsers,
        fetchPrompts,
        deleteUser,
        deletePrompt,
    } = useAdminStore();

    const [activeTab, setActiveTab] = useState('prompts');

    useEffect(() => {
        fetchStatistics();
        fetchUsers();
        fetchPrompts();
    }, [fetchStatistics, fetchUsers, fetchPrompts]);

    if (isLoading) {
        return <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Загрузка</div>;
    }

    if (error) {
        return <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Error: {error}</div>;
    }

    return (
        <section className="h-screen flex flex-col">
            <div className="flex-1 mt-[8%] bg-dark rounded-t-3xl p-[4rem] custom-shadow overflow-y-auto">
                <div className="flex justify-center items-center">
                    <button
                        className={`text-[2.4rem] border-solid border-primary p-[1rem] ${
                            activeTab === 'prompts' ? 'bg-primary' : ''
                        }`}
                        onClick={() => setActiveTab('prompts')}>
                        Prompt-ы
                    </button>
                    <button
                        className={`text-[2.4rem] border-solid border-primary p-[1rem] ${
                            activeTab === 'users' ? 'bg-primary' : ''
                        }`}
                        onClick={() => setActiveTab('users')}>
                        Пользователи
                    </button>
                    <button
                        className={`text-[2.4rem] border-solid border-primary p-[1rem] ${
                            activeTab === 'info' ? 'bg-primary' : ''
                        }`}
                        onClick={() => setActiveTab('info')}>
                        Информация
                    </button>
                </div>

                {activeTab === 'prompts' && (
                    <ul className="mt-[3rem] mx-[2rem] grid grid-cols-3 gap-[4rem] justify-evenly">
                        {prompts.map((prompt) => (
                            <div
                                key={prompt.id}
                                className="inline-flex flex-col items-center justify-between bg-white rounded-xl gap-[2rem] cursor-pointer">
                                <PromptCard prompt={prompt} key={prompt.id} />
                                <button
                                    className="text-danger hover:underline mb-[1rem]"
                                    onClick={() => deletePrompt(prompt.id)}>
                                    Удалить
                                </button>
                            </div>
                        ))}
                    </ul>
                )}

                {activeTab === 'users' && (
                    <ul className="mt-[3rem] mx-[2rem] grid grid-cols-3 gap-[4rem] justify-evenly">
                        {users.map((user) => (
                            <UserCard key={user.id} user={user} onDelete={deleteUser} /> // Используем компонент UserCard
                        ))}
                    </ul>
                )}

                {activeTab === 'info' && (
                    <ul className="mt-[3rem] mx-[2rem] flex flex-col gap-[1rem] text-[3.2rem]">
                        <li>
                            <p>
                                <span className="text-primary uppercase">Пользователи: </span>
                                {statistics.users}
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="text-primary uppercase">Промп-ты: </span>
                                {statistics.prompts}
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="text-primary uppercase">Комментарии: </span>
                                {statistics.comments}
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="text-primary uppercase">Лайки/Дизлайки: </span>
                                {statistics.likes}
                            </p>
                        </li>
                    </ul>
                )}
            </div>
        </section>
    );
};

export default Admin;
