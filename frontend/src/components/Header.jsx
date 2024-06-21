const Header = () => {
  return (
      <header className="z-10 fixed top-0 w-full bg-white rounded-xl flex gap-[4.8rem] justify-between items-center flex-wrap py-[1rem] px-[3.2rem]">
          <h1 className="text-[3rem] uppercase text-title font-bold">🤖 Prompt Sharing Service</h1>
          <nav>
              <ul className="flex items-center justify-center gap-[2.4rem] text-[2.4rem]">
                  <li className="cursor-pointer text-primary ">
                      <a href="#"></a>Главная
                  </li>
                  <li className="cursor-pointer hover:opacity-60">
                      <a href="#"></a>Профиль
                  </li>
                  <li className="cursor-pointer hover:opacity-60">
                      <a href="#"></a>Создать Prompt
                  </li>
              </ul>
          </nav>
      </header>
  );
}

export default Header