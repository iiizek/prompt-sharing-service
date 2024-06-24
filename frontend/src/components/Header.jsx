import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            setIsAdmin(user.isAdmin);
        }
    })

  return (
      <header className="z-10 fixed top-0 w-full bg-white rounded-xl flex gap-[4.8rem] justify-between items-center flex-wrap py-[1rem] px-[3.2rem]">
          <h1 className="text-[3rem] uppercase text-title font-bold">🤖 Prompt Sharing Service</h1>
          <nav>
              <ul className="flex items-center justify-center gap-[2.4rem] text-[2.4rem]">

                  {isAdmin && (
                      <Link to="/admin">
                          <li className="cursor-pointer hover:opacity-60">
                              Админ панель
                          </li>
                      </Link>
                  )}

                  <Link to="/">
                      <li className="cursor-pointer text-primary ">
                          Главная
                      </li>
                  </Link>

                  <Link to="/profile">
                      <li className="cursor-pointer hover:opacity-60">
                          Профиль
                      </li>
                  </Link>
                  <Link to="/create-prompt">
                      <li className="cursor-pointer hover:opacity-60">
                          Создать Prompt
                      </li>
                  </Link>
              </ul>
          </nav>
      </header>
  );
}

export default Header