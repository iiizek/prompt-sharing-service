import React from "react";
import useAuthStore from "../stores/auth";
import usePromptStore from "../stores/prompts";

const Prompt = ({ isOpen, setIsOpen, prompt, rating }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const { addFavorite, removeFavorite, favorites } = useAuthStore();
    const { handleLike, handleDislike, handleAddComment, handleDeleteComment } = usePromptStore();

    const [newComment, setNewComment] = React.useState('');

    // Получаем isFavorite из хранилища
    const isFavorite = favorites.some((favorite) => user.id === favorite.favorite.userId && prompt.id === favorite.favorite.promptId);

    const handleAddToFavorites = () => {
        addFavorite(prompt.id);
    };

    const handleRemoveFromFavorites = () => {
        removeFavorite(prompt.id);
    };

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleSendComment = async () => {
        if (newComment.trim() !== '') {
            // Проверяем, что комментарий не пустой
            await handleAddComment(prompt.id, newComment);
            setNewComment(''); // Очищаем поле ввода
        }
    };

    return (
        <section
            className={`${
                isOpen ? 'block' : 'hidden'
            } z-10 flex flex-col gap-[2rem] absolute w-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white max-h-[52rem] overflow-y-auto p-[4rem] rounded-xl custom-shadow-bg`}>
            <button
                className="text-start text-[2rem] text-danger hover:underline"
                onClick={() => setIsOpen(false)}>
                Закрыть
            </button>
            <div className="flex items-start justify-between">
                <h2 className="text-[3.2rem] font-bold text-title max-w-[75%] text-wrap">
                    {prompt.title}
                </h2>
                <div className="text-[2rem] font-bold flex justify-center items-center gap-[2rem]">
                    <p>{prompt.User.username}</p>
                    <div className="min-w-[6.4rem] h-[6.4rem] bg-gray-400 rounded-full">
                        <img
                            className="w-full h-full rounded-full"
                            src={
                                prompt.User.avatar !== null
                                    ? `http://localhost:5000${prompt.User.avatar}`
                                    : ''
                            }
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="flex gap-[1rem] items-center border-b-prompt pb-[2rem]">
                <div className="flex gap-[1rem] flex-wrap w-full">
                    {prompt.Tags.map((tag) => (
                        <p key={tag.id} className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">
                            {tag.name}
                        </p>
                    ))}
                </div>
                <div className="text-[1.8rem] bg-secondary text-white p-[0.5rem] rounded-lg text-nowrap">
                    {prompt.modelType}
                </div>
            </div>
            <div className="flex flex-col gap-[1rem] items-start">
                <h3 className="text-[2.4rem] text-primary font-bold">Запрос:</h3>
                <p className="text-[1.8rem]">{prompt.promptText}</p>
            </div>
            <div className="flex flex-col gap-[1rem] items-start border-b-prompt pb-[2rem]">
                <h3 className="text-[2.4rem] text-primary font-bold">Ответ:</h3>
                {prompt.resultText && <p className="text-[1.8rem]">{prompt.resultText}</p>}
                <div>
                    {prompt.resultImage && (
                        <img
                            className="w-2/3"
                            src={`http://localhost:5000${prompt.resultImage}`}
                            alt="(Скриншот ответа)"
                        />
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between border-b-prompt pb-[2rem]">
                <p className="text-[1.8rem] text-gray-500">{prompt.createdAt}</p>
                <p className="text-[1.8rem]">
                    <button
                        className="py-[0.3rem] px-[.8rem] border-solid rounded-full border-gray-200"
                        onClick={() => handleLike(prompt.id)}>
                        👍
                    </button>{' '}
                    <span className={rating >= 0 ? 'text-success' : 'text-danger'}>{rating}</span>{' '}
                    <button
                        className="py-[0.3rem] px-[.8rem] border-solid rounded-full border-gray-200"
                        onClick={() => handleDislike(prompt.id)}>
                        👎
                    </button>
                </p>
                {isFavorite && (
                    <button
                        className="bg-primary text-white text-[1.8rem] px-4 py-2 rounded-md transition-all hover:opacity-80"
                        onClick={handleRemoveFromFavorites}>
                        Удалить из избранного ➖
                    </button>
                )}
                {!isFavorite && (
                    <button
                        className="bg-gray-400 text-white text-[1.8rem] px-4 py-2 rounded-md transition-all hover:opacity-80"
                        onClick={handleAddToFavorites}>
                        Добавить в избранное ➕
                    </button>
                )}
            </div>
            <div className="flex flex-col gap-[1rem] items-start">
                <h3 className="text-[2.4rem] text-primary font-bold">Комментарии:</h3>
                <ul className="flex flex-col gap-[1rem]">
                    {prompt.Comments.length === 0 && (
                        <p className="text-[1.8rem] text-primary opacity-80 font-semibold">
                            Комментариев нет
                        </p>
                    )}
                    {prompt.Comments.length > 0 &&
                        prompt.Comments.map((comment) => (
                            <li key={comment.id} className="flex flex-col gap-[.5rem]">
                                <p className="text-[1.8rem] text-primary opacity-80 font-semibold">
                                    {comment.User.username}:
                                </p>

                                {comment.userId === user.id && (
                                    <button
                                        className="text-danger hover:underline"
                                        onClick={() => handleDeleteComment(comment.id)}>
                                        Удалить
                                    </button>
                                )}

                                <p>{comment.content}</p>

                                <p className="text-[1.6rem] text-gray-400">{comment.createdAt}</p>
                            </li>
                        ))}
                </ul>
                <div className="inline-flex items-end justify-between pt-[2rem] gap-[2rem]">
                    <textarea
                        value={newComment}
                        onChange={handleCommentChange}
                        className="p-[1rem] block w-[50rem] bg-gray-100 focus:outline-none rounded-lg"
                        type="text"
                        placeholder="Написать комментарий"
                    />
                    <button
                        className="bg-primary text-white text-[1.8rem] p-[1rem] rounded-lg transition-all hover:opacity-80"
                        onClick={handleSendComment}>
                        Отправить
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Prompt;
