import React from "react";

const Search = () => {
    const [isOpenTags, setIsOpenTags] = React.useState(false);

    const handleIsOpenTags = (e) => {
        e.preventDefault();
        setIsOpenTags(!isOpenTags);
    };
	
    return (
        <section className="mt-[10%] mb-[12rem] flex-1">
            <h2 className="text-title text-[4.2rem] uppercase text-center">
                Найди <span className="text-title text-primary">любой </span>prompt
            </h2>
            <div className="flex justify-center mt-[2.4rem]">
                <form className="text-[2rem] relative">
                    <div className="inline-flex items-center">
                        <button
                            className="rounded-l-xl py-[1rem] px-[1.6rem] bg-gray-400 text-white"
                            onClick={handleIsOpenTags}>
                            Теги {!isOpenTags ? '►' : '▼'}
                        </button>
                        <input
                            className="p-[1rem] bg-white focus:outline-none text-dark"
                            type="text"
                            placeholder="Введите запрос"
                        />
                        <button className="rounded-r-xl py-[1rem] px-[1.6rem] bg-primary text-white hover:opacity-80 transition-all">
                            Найти prompt
                        </button>
                    </div>
                    <div
                        className={`bg-white rounded-xl mt-[2rem] w-full ${
                            isOpenTags ? 'absolute' : 'hidden'
                        }`}>
                        <ul className="grid grid-cols-5 py-[1rem] accent-primary">
                            <li>
                                <label className="cursor-pointer p-[2rem]">
                                    <input type="checkbox" /> Тег1
                                </label>
                            </li>
                            <li>
                                <label className="cursor-pointer p-[2rem]">
                                    <input type="checkbox" /> Тег2
                                </label>
                            </li>
                            <li>
                                <label className="cursor-pointer p-[2rem]">
                                    <input type="checkbox" /> Тег3
                                </label>
                            </li>
                        </ul>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Search;
