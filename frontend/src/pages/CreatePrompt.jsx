import React from "react";
import { useNavigate } from 'react-router-dom';
import usePromptStore from '../stores/prompts';
import useTagStore from '../stores/tags';

const CreatePrompt = () => {
    const { addPrompt, isLoading, error } = usePromptStore();
    const { tags } = useTagStore();
    const navigate = useNavigate();

    const [title, setTitle] = React.useState('');
    const [promptText, setPromptText] = React.useState('');
    const [resultText, setResultText] = React.useState('');
    const [modelType, setModelType] = React.useState('');
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [newTagName, setNewTagName] = React.useState('');
    const [resultImage, setResultImage] = React.useState(null);

    const handleTagInputChange = (event) => {
        setNewTagName(event.target.value);
    };

    const handleRemoveTag = (tagName) => {
        setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
    };

    const handleAddTag = () => {
        if (newTagName && !selectedTags.includes(newTagName)) {
            setSelectedTags([...selectedTags, newTagName]);
            setNewTagName(''); // Очищаем поле ввода
        }
    };

    const handleImage = (event) => {
        setResultImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('promptText', promptText);
        if (resultText) formData.append('resultText', resultText);
        formData.append('modelType', modelType);
        if (resultImage) formData.append('resultImage', resultImage);

        await addPrompt(formData, navigate, selectedTags); // Передаем selectedTags в addPrompt
    };

    return (
        <section className="absolute rounded-3xl bg-dark custom-shadow w-full left-1/2 bottom-0 -translate-x-1/2 p-[4rem]">
            <h2 className="text-center text-[2.8rem] uppercase font-bold text-title text-primary">
                Создание prompt-а
            </h2>
            {error && error !== 'Request failed with status code 404' && (
                <div className="text-red-500 text-center">{error}</div>
            )}
            <form className="flex flex-col gap-[2rem]" onSubmit={handleSubmit}>
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-[1rem] w-1/2">
                        <h3 className="text-[2.4rem]">Заголовок</h3>
                        <textarea
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            name="title"
                            id="title"
                            rows="2"
                            className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl"
                            placeholder="Например, 'Привет мир!'"></textarea>
                    </div>
                    <div className="flex flex-col gap-[1rem] items-end">
                        <h3 className="text-[2.4rem]">Модель</h3>
                        <input
                            value={modelType}
                            onChange={(event) => setModelType(event.target.value)}
                            name="modelType"
                            id="modelType"
                            type="text"
                            className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl"
                            placeholder="Например, 'ChatGPT-4o'"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[1rem]">
                    <h3 className="text-[2.4rem]">Теги</h3>
                    <ul className="flex justify-start items-stretch gap-[2rem] flex-wrap">
                        {selectedTags.map(
                            (
                                tagName, // Отображаем выбранные теги
                            ) => (
                                <li key={tagName} className="flex justify-start items-stretch">
                                    <p className="text-[2.8rem] text-primary font text-title">#</p>
                                    <span className="p-[.5rem] text-[1.8rem] bg-transparent border-solid border-white focus:outline-none rounded-l-xl">
                                        {tagName}
                                    </span>
                                    <div
                                        className="bg-white px-[1rem] rounded-r-xl cursor-pointer flex justify-center items-center"
                                        onClick={() => handleRemoveTag(tagName)}>
                                        🗑️
                                    </div>
                                </li>
                            ),
                        )}
                        <li className="flex justify-start items-stretch">
                            <p className="text-[2.8rem] text-primary font text-title">#</p>
                            <input
                                type="text"
                                value={newTagName}
                                onChange={handleTagInputChange}
                                className="p-[.5rem] text-[1.8rem] bg-transparent border-solid border-white focus:outline-none rounded-l-xl"
                                placeholder="Например, LLM"
                            />
                            <div
                                className="bg-white px-[1rem] rounded-r-xl flex justify-center items-center cursor-pointer"
                                onClick={handleAddTag}>
                                ➕
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="flex items-start justify-between gap-[4rem]">
                    <div className="flex flex-col gap-[1rem] w-1/2">
                        <h3 className="text-[2.4rem]">Запрос</h3>
                        <textarea
                            value={promptText}
                            onChange={(event) => setPromptText(event.target.value)}
                            name="promptText"
                            id="promptText"
                            className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl"
                            placeholder="Запрос нейросети"></textarea>
                    </div>
                    <div className="flex flex-col gap-[1rem] w-1/2">
                        <h3 className="text-[2.4rem]">Ответ</h3>
                        <textarea
                            value={resultText}
                            onChange={(event) => setResultText(event.target.value)}
                            name="resultText"
                            id="resultText"
                            className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl"
                            placeholder="Ответ нейросети"></textarea>
                        <h3 className="text-[2.4rem]">Скриншот (Опционально)</h3>
                        <input
                            name="image"
                            id="image"
                            onChange={handleImage}
                            type="file"
                            className="text-primary"
                        />
                    </div>
                </div>

                <button
                    className="bg-primary py-[.5rem] text-[2.4rem] rounded-xl transition-all hover:bg-white"
                    disabled={isLoading}
                    type="submit">
                    {isLoading ? 'Создание...' : 'Создать prompt'}
                </button>
            </form>
        </section>
    );
};

export default CreatePrompt;
