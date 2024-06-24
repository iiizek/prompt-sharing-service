import React from 'react';

const UserCard = ({ user, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
            onDelete(user.id);
        }
    };

    return (
        <li className="bg-white rounded-xl p-[2rem] flex flex-col gap-[1rem]">
            <div className="flex justify-start items-center gap-[1rem]">
                <div className="w-[6.4rem] h-[6.4rem] bg-gray-300 rounded-full overflow-hidden">
                    {' '}
                    {/* Добавлен overflow-hidden */}
                    {user.avatar && ( // Проверяем наличие аватара
                        <img
                            src={`http://localhost:5000${user.avatar}`}
                            alt=""
                            className="w-full h-full object-cover" // Добавлено object-cover для корректного отображения
                        />
                    )}
                </div>
                <div>
                    <p className="uppercase text-primary">{user.username}</p>
                    <p>{user.email}</p>
                </div>
            </div>
            {user.bio && ( // Отображаем био, если оно есть
                <div className="flex gap-[1rem]">
                    <p className="text-primary">Био:</p>
                    <p>{user.bio}</p>
                </div>
            )}
            <div className="flex justify-between items-center">
                <p>
                    <span className="text-primary">Зарегистрирован:</span>{' '}
                    {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <button className="text-danger hover:underline" onClick={handleDelete}>
                    Удалить
                </button>
            </div>
        </li>
    );
};

export default UserCard;
