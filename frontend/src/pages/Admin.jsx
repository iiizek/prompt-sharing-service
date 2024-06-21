import React from 'react';

const Admin = () => {
    return (
        <section className="h-screen flex flex-col">
            <div className="flex-1 mt-[8%] bg-dark rounded-t-3xl p-[4rem] custom-shadow overflow-y-auto">
                <div className="flex justify-center items-center">
                    <button className="text-[2.4rem] border-solid border-primary bg-primary rounded-l-3xl p-[1rem]">
                        Prompt-ы
                    </button>
                    <button className="text-[2.4rem] border-solid border-primary p-[1rem]">
                        Пользователи
                    </button>
                    <button className="text-[2.4rem] border-solid border-primary rounded-r-3xl p-[1rem]">
                        Информация
                    </button>
                </div>
                <ul className="mt-[3rem] mx-[2rem] grid grid-cols-3 gap-[4rem] justify-evenly">
                    {/* Карточки prompt-ов */}
                    <li className="p-[1.5rem] inline-flex flex-col bg-white rounded-xl gap-[2rem] cursor-pointer">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-[1rem] flex-wrap w-full">
                                <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег1</p>
                                <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег2</p>
                                <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег3</p>
                            </div>
                            <div className="flex flex-col justify-center items-end gap-[.5rem]">
                                <p className=" text-danger hover:underline">Удалить</p>
                            </div>
                        </div>
                        <div className="flex gap-[2rem] justify-start items-center">
                            <div className="bg-gray-300 rounded-full w-[6.4rem] h-[6.4rem]">
                                <img src="#" alt="" />
                            </div>
                            <h3 className="text-[2.4rem]">Заголовок prompt-а</h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[1.8rem] bg-secondary text-white p-[0.5rem] rounded-lg">
                                ChatGPT-4o
                            </p>
                            <p>
                                👍 <span className={`${'text-danger'}`}>-1</span> 👎
                            </p>
                        </div>
                    </li>
                    
                    <li className="p-[1.5rem] inline-flex flex-col bg-white rounded-xl gap-[2rem] cursor-pointer">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-[1rem] flex-wrap w-full">
                                <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег1</p>
                                <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег2</p>
                                <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег3</p>
                            </div>
                            <div className="flex flex-col justify-center items-end gap-[.5rem]">
                                <p className=" text-danger hover:underline">Удалить</p>
                            </div>
                        </div>

                        <div className="flex gap-[2rem] justify-start items-center">
                            <div className="bg-gray-300 rounded-full w-[6.4rem] h-[6.4rem]">
                                <img src="#" alt="" />
                            </div>
                            <h3 className="text-[2.4rem]">Заголовок prompt-а</h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[1.8rem] bg-secondary text-white p-[0.5rem] rounded-lg">
                                ChatGPT-4o
                            </p>
                            <p>
                                👍 <span className={`${'text-success'}`}>+6</span> 👎
                            </p>
                        </div>
                    </li>

                    {/* Карточки пользователей */}
                    {/* <li className="bg-white rounded-xl p-[2rem] flex flex-col gap-[1rem]">
                        <div className="flex justify-start items-center gap-[1rem]">
                            <div className="w-[6.4rem] h-[6.4rem] bg-gray-300 rounded-full">
                                <img src="" alt="" />
                            </div>
                            <div>
                                <p className="uppercase text-primary">Имя пользователя</p>
                                <p>example@email.net</p>
                            </div>
                        </div>
                        <div className="flex gap-[1rem]">
                            <p className="text-primary">Био:</p>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam nobis
                                consectetur commodi, quos temporibus neque minima illum asperiores
                                perferendis doloremque.
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>
                                <span className="text-primary">Зарегистрирован:</span> {'Дата'}
                            </p>
                            <button className="text-danger hover:underline">Удалить</button>
                        </div>
                    </li> */}

                    {/*Информация по сервису*/}
                    {/* <li className="flex flex-col gap-[1rem] text-[3.2rem]">
                        <li>
                            <p>
                                <span className="text-primary uppercase">Пользователи: </span>
                                {99}
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="text-primary uppercase">Prompt-ы: </span>
                                {99}
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="text-primary uppercase">Лайки: </span>
                                {99}
                            </p>
                        </li>
                        <li>
                            <p>
                                <span className="text-primary uppercase">Комментарии: </span>
                                {99}
                            </p>
                        </li>
                    </li> */}
                </ul>
            </div>
        </section>
    );
};

export default Admin;
