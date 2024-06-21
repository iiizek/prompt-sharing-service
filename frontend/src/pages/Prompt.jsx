const Prompt = () => {
    return (
        <section className="z-10 flex flex-col gap-[2rem] absolute w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white max-h-[52rem] overflow-y-auto p-[4rem] rounded-xl custom-shadow-bg">
            <div className="flex items-start justify-between ">
                <h2 className="text-[3.2rem] font-bold text-title max-w-[75%] text-wrap">
                    Заголовок prompt-а Lorem ipsum dolor sit amet
                </h2>
                <div className="text-[2rem] font-bold flex justify-center items-center gap-[2rem]">
                    <p>Имя автора</p>
                    <div className="w-[6.4rem] h-[6.4rem] bg-gray-400 rounded-full">
                        <img src="#" alt="" />
                    </div>
                </div>
            </div>
            <div className="flex gap-[1rem] items-center border-b-prompt pb-[2rem]">
                <div className="flex gap-[1rem] flex-wrap w-full">
                    <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег1</p>
                    <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег2</p>
                    <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег3</p>
                </div>
                <div className="text-[1.8rem] bg-secondary text-white p-[0.5rem] rounded-lg">
                    ChatGPT-4o
                </div>
            </div>
            <div className="flex flex-col gap-[1rem] items-start">
                <h3 className="text-[2.4rem] text-primary font-bold">Запрос:</h3>
                <p className="text-[1.8rem]">
                    Текст запроса Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Doloremque tenetur, fuga ex totam deleniti voluptatum, adipisci ratione eligendi
                    sunt sed saepe vero, explicabo repudiandae optio unde mollitia quia id. Modi.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores quaerat
                    inventore voluptates laudantium necessitatibus voluptas nemo repellendus ea,
                    alias numquam!
                </p>
            </div>
            <div className="flex flex-col gap-[1rem] items-start border-b-prompt pb-[2rem]">
                <h3 className="text-[2.4rem] text-primary font-bold">Ответ:</h3>
                <p className="text-[1.8rem]">
                    Ответ запроса Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repudiandae iste nesciunt dolorum nam dicta ullam illo consequatur minima atque
                    animi ex nemo nulla, labore facere doloribus enim qui impedit a. Lorem, ipsum
                    dolor sit amet consectetur adipisicing elit. Minima accusamus ad praesentium
                    illo, excepturi cumque sint id eum impedit qui cupiditate aspernatur pariatur
                    vero quo voluptas eius, ab doloremque quod!
                </p>
                <div>
                    <img src="" alt="(Скриншот ответа)" />
                </div>
            </div>
            <div className="flex items-center justify-between border-b-prompt pb-[2rem]">
                <p className="text-[1.8rem] text-gray-500">{'Дата создания'}</p>
                <p className="text-[1.8rem]">
                    <button className="py-[0.3rem] px-[.8rem] border-solid rounded-full border-gray-200">
                        👍
                    </button>{' '}
                    <span className="text-success mx-[1rem]">{'+6'}</span>{' '}
                    <button className="py-[0.3rem] px-[.8rem] border-solid rounded-full border-gray-200">
                        👎
                    </button>
                </p>
                <button className="bg-gray-400 text-white text-[1.8rem] px-4 py-2 rounded-md transition-all hover:opacity-80">
                    Добавить в избранное 🔰
                </button>
            </div>
            <div className="flex flex-col gap-[1rem] items-start">
                <h3 className="text-[2.4rem] text-primary font-bold">Комментарии:</h3>
                <ul className="flex flex-col gap-[1rem]">
                    <li className="flex flex-col gap-[.5rem]">
                        <p className="text-[1.8rem] text-primary opacity-80 font-semibold">
                            {'Имя комментатора'}:
                        </p>

                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem impedit
                            exercitationem, perferendis doloribus adipisci maiores tempora, ipsum
                            quae nihil dolorum, iusto aperiam ut quisquam nemo sequi molestiae odit
                            aliquam tempore.
                        </p>

                        <p className="text-[1.6rem] text-gray-400">{'Дата создания'}</p>
                    </li>
                    <li className="flex flex-col gap-[.5rem]">
                        <p className="text-[1.8rem] text-primary opacity-80 font-semibold">
                            {'Имя комментатора'}:
                        </p>

                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem impedit
                            exercitationem, perferendis doloribus adipisci maiores tempora, ipsum
                            quae nihil dolorum, iusto aperiam ut quisquam nemo sequi molestiae odit
                            aliquam tempore.
                        </p>

                        <p className="text-[1.6rem] text-gray-400">{'Дата создания'}</p>
                    </li>
                </ul>
                <div className="inline-flex items-end justify-between pt-[2rem] gap-[2rem]">
                    <textarea
                        className="p-[1rem] block w-[50rem] bg-gray-100 focus:outline-none rounded-lg"
                        type="text"
                        placeholder="Написать комментарий"
                    />
                    <button className="bg-primary text-white text-[1.8rem] p-[1rem] rounded-lg transition-all hover:opacity-80">
                        Отправить
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Prompt;
