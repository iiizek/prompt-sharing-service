const Profile = () => {
    return (
        <section className="flex flex-col gap-[6.4rem] h-screen relative">
            <div className="flex-1 pt-[6%] px-[4%] flex justify-between items-start gap-[20rem]">
                <div className="flex flex-col gap-[1rem]">
                    <div className="flex justify-start items-start gap-[3rem]">
                        <div className="min-w-[12.8rem] h-[12.8rem] bg-gray-400 rounded-full outline outline-primary">
                            <img src="" alt="" />
                        </div>
                        <div className="flex flex-col gap-[1.5rem]">
                            <p className="text-[3.2rem] font-bold uppercase text-primary">
                                Имя пользователя
                            </p>

                            <p className="text-[2.4rem] font-bold uppercase">
                                example@email.net
                            </p>

                            <div>
                                <h3 className="text-[2rem] font-bold uppercase text-primary">
                                    Био:
                                </h3>
                                <p className="text-[1.8rem]">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                                    error fuga assumenda, doloribus alias quia aliquam porro, totam
                                    incidunt, nisi rem ipsam voluptatem corporis? Fugit officia
                                    nobis earum libero eligendi?
                                </p>
                            </div>

                            <div className="flex items-center gap-[1rem]">
                                <h3 className="text-[2rem] font-bold uppercase text-primary">
                                    Зарегистрирован:
                                </h3>
                                <p className="text-[2rem] uppercase">{'Дата (Циферки)'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="bg-primary text-white text-[1.8rem] px-4 py-2 rounded-md text-nowrap transition-all hover:opacity-80">
                    Изменить профиль
                </button>
            </div>

            <div className="bg-dark rounded-t-3xl p-[4rem] custom-shadow overflow-y-auto">
                <div className="flex justify-center items-center">
                    <button className="text-[2.4rem] border-solid border-primary bg-primary rounded-l-3xl p-[1rem]">
                        Созданные
                    </button>
                    <button className="text-[2.4rem] border-solid border-primary rounded-r-3xl p-[1rem]">
                        Избранные
                    </button>
                </div>
                <ul className="mt-[3rem] mx-[2rem] grid grid-cols-3 gap-[4rem] justify-evenly">
                    <li className="p-[1.5rem] inline-flex flex-col bg-white rounded-xl gap-[2rem] cursor-pointer">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-[1rem] flex-wrap w-full">
                                <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег1</p>
                                <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег2</p>
                                <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег3</p>
                            </div>
                            <div className="flex flex-col justify-center items-end gap-[.5rem]">
                                <p className=" text-secondary hover:underline">✏️Изменить</p>
                                <p className=" text-danger hover:underline">🗑️Удалить</p>
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
                                <p className=" text-secondary hover:underline">✏️Изменить</p>
                                <p className=" text-danger hover:underline">🗑️Удалить</p>
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

                    <li className="p-[1.5rem] inline-flex flex-col bg-white rounded-xl gap-[2rem] cursor-pointer">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-[1rem] flex-wrap w-full">
                                <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег1</p>
                                <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег2</p>
                                <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег3</p>
                            </div>
                            <div className="flex flex-col justify-center items-end gap-[.5rem]">
                                <p className=" text-secondary hover:underline">✏️Изменить</p>
                                <p className=" text-danger hover:underline">🗑️Удалить</p>
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
                </ul>
            </div>
        </section>
    );
};

export default Profile;
