import React from 'react';

const Auth = () => {
    const [isRegister, setIsRegister] = React.useState(false);

    const handleIsRegister = () => {
        setIsRegister(!isRegister);
    };

    return (
        <section className="flex justify-center items-center h-screen">
            <div className="bg-white rounded-xl shadow-lg p-[3rem] custom-shadow">
                <div className="flex justify-between items-center gap-[4rem]">
                    <h1 className="text-[2.4rem] font-bold">Авторизация / Регистрация</h1>
                    <button
                        className="text-secondary px-4 py-1 hover:underline"
                        onClick={handleIsRegister}>
                        {!isRegister ? 'Есть аккаунт?' : 'Нет аккаунта?'}
                    </button>
                </div>
                <form className="mt-4 space-y-4">
                    {!isRegister && (
                        <div>
                            <label htmlFor="username" className="block text-gray-700">
                                Имя пользователя
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                            />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">
                            Пароль
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white text-[2.4rem] px-4 py-2 rounded-md w-full transition-all hover:opacity-80">
                        {isRegister ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Auth;
