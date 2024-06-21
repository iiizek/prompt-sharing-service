import React from 'react'

const UpdateProfile = () => {
  return (
      <section className="absolute rounded-3xl bg-dark custom-shadow w-full left-1/2 bottom-0 -translate-x-1/2 p-[4rem]">
          <h2 className="text-center text-[2.8rem] uppercase font-bold text-title text-primary">
              Обновить профиль
          </h2>
          <form className="flex flex-col gap-[2rem]">
              <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-[1rem] w-1/2">
                      <h3 className="text-[2.4rem]">Имя пользователя</h3>
                      <input
                          className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl"
                          placeholder="Например, Иван Иванов"></input>
                  </div>
                  <div className="flex flex-col gap-[1rem] items-end">
                      <h3 className="text-[2.4rem]">Эл. почта</h3>
                      <input
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
                          className="w-full p-[1rem] text-[1.8rem] bg-transparent border-solid border-primary focus:outline-none rounded-xl"
                          placeholder="Что-то о себе в кратце..."></textarea>
                      <h3 className="text-[2.4rem]">Фотография профиля</h3>
                      <input type="file" className="text-primary" />
                  </div>
              </div>

              <button className="bg-primary py-[.5rem] text-[2.4rem] rounded-xl transition-all hover:bg-white">
                  Обновить
              </button>
          </form>
      </section>
  );
}

export default UpdateProfile;