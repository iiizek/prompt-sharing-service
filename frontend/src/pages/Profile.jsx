import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../stores/auth.js';
import PromptCard from '../components/PromptCard.jsx';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, token, fetchUserData, fetchFavoritePrompts, favorites, logout, isLoading, error } = useAuthStore();
    const [activeTab, setActiveTab] = React.useState('created');

    const navigate = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            const user = localStorage.getItem('user');
            fetchUserData(JSON.parse(user).id);
            fetchFavoritePrompts();
        } else {
            navigate('/auth');
        }
    }, [token, fetchUserData]);

    const handleLogout = () => {
        logout(navigate);
    };

    if (isLoading) {
        return <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Loading...</div>;
    }

    if (error) {
        return (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Error: {error}
            </div>
        );
    }

    if (!user) {
        return (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                Пользователь не авторизован
            </div>
        ); // Или редирект на страницу авторизации
    }

    return (
        <section className="flex flex-col gap-[6.4rem] h-screen relative">
            <div className="flex-1 pt-[6%] px-[4%] flex justify-between items-start gap-[20rem]">
                <div className="flex flex-col gap-[1rem]">
                    <div className="flex justify-start items-start gap-[3rem]">
                        <div className="min-w-[12.8rem] h-[12.8rem] bg-gray-400 rounded-full outline outline-primary">
                            <img className='w-full h-full rounded-full' src={`http://localhost:5000${user.avatar}`} alt="" />
                        </div>
                        <div className="flex flex-col gap-[1.5rem]">
                            <p className="text-[3.2rem] font-bold uppercase text-primary">
                                {user.username}
                            </p>

                            <p className="text-[2.4rem] font-bold uppercase">{user.email}</p>

                            <div>
                                <h3 className="text-[2rem] font-bold uppercase text-primary">
                                    Био:
                                </h3>
                                <p className="text-[1.8rem]">
                                    {user.bio ? user.bio : 'Био не указано'}
                                </p>
                            </div>

                            <div className="flex items-center gap-[1rem]">
                                <h3 className="text-[2rem] font-bold uppercase text-primary">
                                    Зарегистрирован:
                                </h3>
                                <p className="text-[2rem] uppercase">{user.createdAt}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-[2rem]">
                    <Link
                        to="/update-profile"
                        className="bg-primary text-white text-[1.8rem] px-4 py-2 rounded-md text-nowrap transition-all hover:opacity-80">
                        <button>Изменить профиль</button>
                    </Link>

                    <button
                        className="bg-danger text-white text-[1.8rem] px-4 py-2 rounded-md text-nowrap transition-all hover:opacity-80"
                        onClick={handleLogout}>
                        Выйти
                    </button>
                </div>
            </div>

            <div className="bg-dark rounded-t-3xl p-[4rem] custom-shadow overflow-y-auto">
                <div className='flex justify-center'>
                    <button
                        className={`text-[2.4rem] rounded-l-xl border-solid border-primary p-[1rem] ${
                            activeTab === 'created' ? 'bg-primary' : ''
                        }`}
                        onClick={() => setActiveTab('created')}>
                        Созданные
                    </button>
                    <button
                        className={`text-[2.4rem] rounded-r-xl border-solid border-primary p-[1rem] ${
                            activeTab === 'favorites' ? 'bg-primary' : ''
                        }`}
                        onClick={() => setActiveTab('favorites')}>
                        Избранные
                    </button>
                </div>

                <ul className="mt-[3rem] mx-[2rem] grid grid-cols-3 gap-[4rem] justify-evenly">
                    {activeTab === 'created' &&
                        user.Prompts &&
                        user.Prompts.map((prompt) => (
                            <PromptCard key={prompt.id} prompt={prompt} />
                        ))}
                    {
                        activeTab === 'created' && user.Prompts && user.Prompts.length === 0 && (
                            <p className="text-[2.4rem]">
                                У пользователя нет созданных Prompt-ов
                            </p>
                        )
                    }
                    {activeTab === 'favorites' &&
                        favorites &&
                        favorites.map((favorite) => (
                            <PromptCard key={favorite.id} prompt={favorite} />
                        ))}
                    {
                        activeTab === 'favorites' && favorites && favorites.length === 0 && (
                            <p className="text-[2.4rem]">
                                У пользователя нет избранных Prompt-ов
                            </p>
                        )
                    }
                </ul>
            </div>
        </section>
    );
};

export default Profile;
