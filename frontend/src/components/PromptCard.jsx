import React from 'react';
import Prompt from './Prompt';
import { Link } from 'react-router-dom';
import usePromptStore from '../stores/prompts';
import useAuthStore from '../stores/auth';

const PromptCard = ({ prompt }) => {
	const user = JSON.stringify(localStorage.getItem('user'));
    const [isOpen, setIsOpen] = React.useState(false);

    // Расчет рейтинга
    const rating = prompt.Likes.reduce((acc, like) => {
        if (like.type === 'like') {
            return acc + 1;
        } else if (like.type === 'dislike') {
            return acc - 1;
        } else {
            return acc; // На случай, если тип лайка не определен
        }
    }, 0);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const { deletePrompt } = usePromptStore();
	const { fetchUserData } = useAuthStore();

    const handleDeletePrompt = async () => {
        if (window.confirm('Вы уверены, что хотите удалить этот prompt?')) {
            // Подтверждение удаления
            await deletePrompt(prompt.id);
			setIsOpen(false);
			if (localStorage.getItem('token')) {
                const user = localStorage.getItem('user');
                fetchUserData(JSON.parse(user).id);
                fetchFavoritePrompts();
            } else {
                navigate('/auth');
            }
        }
    };

    return (
        <>
            <li
                className="p-[1.5rem] inline-flex flex-col justify-between bg-white rounded-xl gap-[2rem] cursor-pointer"
                onClick={handleOpen}>
                {prompt.Tags.length > 0 && (
                    <div className="flex gap-[1rem] flex-wrap w-full">
                        {prompt.Tags.map((tag) => (
                            <p key={tag.id} className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">
                                {tag.name}
                            </p>
                        ))}
                    </div>
                )}
                <div className="flex gap-[2rem] justify-start items-center">
                    <div className="bg-gray-300 rounded-full min-w-[6.4rem] h-[6.4rem]">
                        <img
                            className="w-full h-full object-cover rounded-full"
                            src={
                                prompt.User.avatar !== null
                                    ? `http://localhost:5000${prompt.User.avatar}`
                                    : ''
                            }
                            alt=""
                        />
                    </div>
                    <h3 className="text-[2.4rem] text-wrap">{prompt.title}</h3>
                </div>
                <div className="flex justify-between items-center">
                    <p className="text-[1.8rem] bg-secondary text-white p-[0.5rem] rounded-lg">
                        {prompt.modelType}
                    </p>
                    <p>
                        👍{' '}
                        <span className={`${rating >= 0 ? 'text-success' : 'text-danger'}`}>
                            {rating}
                        </span>{' '}
                        👎
                    </p>
                </div>

                {user.id === prompt.userId && (
                    <div className="flex justify-between items-center">
                        <Link to={`/update-prompt/${prompt.id}`}>
                            <button className="text-primary hover:underline">Редактировать</button>
                        </Link>
                        <button
                            className="text-danger hover:underline"
                            onClick={handleDeletePrompt}>
                            Удалить
                        </button>
                    </div>
                )}
            </li>

            <Prompt isOpen={isOpen} setIsOpen={setIsOpen} prompt={prompt} rating={rating} />
        </>
    );
};

export default PromptCard;
