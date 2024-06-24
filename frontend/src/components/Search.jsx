import React, { useState, useEffect } from 'react';
import { searchPrompts } from '../api/prompts';
import useTagStore from '../stores/tags';
import usePromptStore from '../stores/prompts';

const Search = () => {
    const { tags, fetchTags } = useTagStore();
    const { setPrompts } = usePromptStore(); // Функция для обновления промптов в хранилище

    const [isOpenTags, setIsOpenTags] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        fetchTags();
    }, []);

    const handleIsOpenTags = (e) => {
        e.preventDefault();
        setIsOpenTags(!isOpenTags);
    };

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        searchPrompts(searchTerm, selectedTags)
            .then((results) => {
                // Обновляем промпты в хранилище
                setPrompts(results);
            })
            .catch((error) => {
                console.error('Ошибка поиска:', error);
            });
    };

    const handleTagChange = (tagId) => {
        setSelectedTags((prevTags) => {
            if (prevTags.includes(tagId)) {
                return prevTags.filter((id) => id !== tagId);
            } else {
                return [...prevTags, tagId];
            }
        });
    };

    return (
        <section className="mt-[10%] mb-[12rem] flex-1">
            <h2 className="text-title text-[4.2rem] uppercase text-center">
                Найди <span className="text-title text-primary">любой </span>prompt
            </h2>
            <div className="flex justify-center mt-[2.4rem]">
                <form className="text-[2rem] relative" onSubmit={handleSearchSubmit}>
                    <div className="inline-flex items-center">
                        <button
                            className="rounded-l-xl py-[1rem] px-[1.6rem] bg-gray-400 text-white"
                            onClick={handleIsOpenTags}>
                            Теги {!isOpenTags ? '►' : '▼'}
                        </button>
                        <input
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                            className="p-[1rem] bg-white focus:outline-none text-dark"
                            type="text"
                            placeholder="Введите запрос"
                        />
                        <button
                            className="rounded-r-xl py-[1rem] px-[1.6rem] bg-primary text-white hover:opacity-80 transition-all"
                            type="submit">
                            Найти prompt
                        </button>
                    </div>
                    <div
                        className={`bg-white rounded-xl mt-[2rem] w-full ${
                            isOpenTags ? 'absolute' : 'hidden'
                        }`}>
                        <ul className="grid grid-cols-3 py-[1rem] accent-primary">
                            {tags.map((tag) => (
                                <li key={tag.id}>
                                    <label className="cursor-pointer p-[2rem] flex gap-[1rem]">
                                        <input
                                            value={tag.id}
                                            checked={selectedTags.includes(tag.id)}
                                            onChange={() => handleTagChange(tag.id)}
                                            type="checkbox"
                                        />{' '}
                                        <p>{tag.name}</p>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Search;
