import React from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/auth';

const UpdateProfile = () => {
    const { user, updateUserProfile, uploadUserAvatar, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const [username, setUsername] = React.useState(user ? user.username : '');
    const [email, setEmail] = React.useState(user ? user.email : '');
    const [bio, setBio] = React.useState(user ? user.bio : '');
    const [avatarFile, setAvatarFile] = React.useState(null);

    const handleAvatarChange = (event) => {
        setAvatarFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = { username, email, bio }; // Обновляем только измененные поля

        await updateUserProfile(userData, navigate);
        if (avatarFile) {
            await uploadUserAvatar(avatarFile);
        }
        
        navigate('/profile'); // Редирект на страницу профиля
    };


  return (
      <section className="absolute rounded-3xl bg-dark custom-shadow w-full left-1/2 bottom-0 -translate-x-1/2 p-[4rem]">
          <h2 className="text-center text-[2.8rem] uppercase font-bold text-title text-primary">
              Обновить профиль
          </h2>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <form className="flex flex-col gap-[2rem]" onSubmit={handleSubmit}>
              <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-[1rem] w-1/2">
                      <h3 className="text-[2.4rem]">Имя пользователя</h3>
                      <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          name="username"
                          className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl"
                          placeholder="Например, Иван Иванов"></input>
                  </div>
                  <div className="flex flex-col gap-[1rem] items-end">
                      <h3 className="text-[2.4rem]">Эл. почта</h3>
                      <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          name="email"
                          type="text"
                          className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl"
                          placeholder="example@email.com"
                      />
                  </div>
              </div>

              <div className="flex items-start justify-between gap-[4rem]">
                  <div className="flex flex-col gap-[1rem] w-1/2">
                      <h3 className="text-[2.4rem]">Био</h3>
                      <textarea
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          name="bio"
                          id="bio"
                          className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl"
                          placeholder="Что-то о себе в кратце..."></textarea>
                      <h3 className="text-[2.4rem]">Фотография профиля</h3>
                      <input
                          onChange={handleAvatarChange}
                          name="avatar"
                          id="avatar"
                          type="file"
                          className="text-primary"
                      />
                  </div>
              </div>

              <button
                  className="bg-primary py-[.5rem] text-[2.4rem] rounded-xl transition-all hover:bg-white"
                  type="submit"
                  disabled={isLoading}>
                  {isLoading ? 'Обновление...' : 'Обновить'}
              </button>
          </form>
      </section>
  );
}

export default UpdateProfile;