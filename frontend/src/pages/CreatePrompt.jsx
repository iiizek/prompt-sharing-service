const CreatePrompt = () => {
    return (
        <section className="absolute rounded-3xl bg-dark custom-shadow w-full left-1/2 bottom-0 -translate-x-1/2 p-[4rem]">
            <h2 className="text-center text-[2.8rem] uppercase font-bold text-title text-primary">
                Создание prompt-а
            </h2>
            <form className="flex flex-col gap-[2rem]">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-[1rem] w-1/2">
                        <h3 className="text-[2.4rem]">Заголовок</h3>
                        <textarea
                            rows="2"
                            className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl"
                            placeholder="Например, 'Привет мир!'"></textarea>
                    </div>
                    <div className="flex flex-col gap-[1rem] items-end">
                        <h3 className="text-[2.4rem]">Модель</h3>
                        <input
                            type="text"
                            className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl"
                            placeholder="Например, 'ChatGPT-4o'"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[1rem]">
                    <h3 className="text-[2.4rem]">Теги</h3>
                    <ul className="flex justify-start items-stretch gap-[2rem] flex-wrap">
                        <li className="flex justify-start items-stretch">
                            <p className="text-[2.8rem] text-primary font text-title">#</p>
                            <input
                                type="text"
                                className="p-[.5rem] text-[1.8rem] bg-transparent border-solid border-white focus:outline-none rounded-l-xl"
                                placeholder="Например, LLM"
                            />
                            <button className="bg-white px-[1rem] rounded-r-xl">🗑️</button>
                        </li>
                        <li className="flex items-stretch">
                            <button className="bg-primary px-[1rem] text-[1.8rem] rounded-xl transition-all hover:bg-white">
                                Добавить
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="flex items-start justify-between gap-[4rem]">
                    <div className="flex flex-col gap-[1rem] w-1/2">
                        <h3 className="text-[2.4rem]">Запрос</h3>
                        <textarea className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl" placeholder="Запрос нейросети"></textarea>
                    </div>
                    <div className="flex flex-col gap-[1rem] w-1/2">
                        <h3 className="text-[2.4rem]">Ответ</h3>
                        <textarea className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl" placeholder="Ответ нейросети"></textarea>
                        <h3 className="text-[2.4rem]">Скриншот (Опционально)</h3>
                        <input type="file" className="text-primary" />
                    </div>
                </div>

                <button className="bg-primary py-[.5rem] text-[2.4rem] rounded-xl transition-all hover:bg-white">Создать prompt</button>
            </form>
        </section>
    );
};

export default CreatePrompt;
