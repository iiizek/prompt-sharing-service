import Search from '../components/Search';
import Prompt from './Prompt';

const Main = () => {
    return (
        <div className="flex flex-col overflow-x-hidden h-[100vh]">
            <Prompt />
            <Search />

            <section className="bg-dark rounded-t-3xl p-[2rem] custom-shadow">
                <h2 className="text-title text-[3.2rem] text-center">Список prompt-ов</h2>
                <ul className="mt-[3rem] mx-[2rem] grid grid-cols-3 gap-[4rem] justify-evenly">
                    <li className="p-[1.5rem] inline-flex flex-col bg-white rounded-xl gap-[2rem] cursor-pointer">
                        <div className="flex gap-[1rem] flex-wrap w-full">
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег1</p>
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег2</p>
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег3</p>
                        </div>
                        <div className="flex gap-[2rem] justify-start items-center">
                            <div className="bg-gray-300 rounded-full w-[6.4rem] h-[6.4rem]">
                                <img src="#" alt="" />
                            </div>
                            <h3 className="text-[2.4rem]">Заголовок prompt-а</h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[1.8rem] bg-secondary text-white p-[0.5rem] rounded-lg">
                                ChatGPT-4o
                            </p>
                            <p>
                                👍 <span className={`${'text-success'}`}>+6</span> 👎
                            </p>
                        </div>
                    </li>

                    <li className="p-[1.5rem] inline-flex flex-col bg-white rounded-xl gap-[2rem] cursor-pointer">
                        <div className="flex gap-[1rem] flex-wrap w-full">
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег1</p>
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег2</p>
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег3</p>
                        </div>
                        <div className="flex gap-[2rem] justify-start items-center">
                            <div className="bg-gray-300 rounded-full w-[6.4rem] h-[6.4rem]">
                                <img src="#" alt="" />
                            </div>
                            <h3 className="text-[2.4rem]">Заголовок prompt-а</h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[1.8rem] bg-secondary text-white p-[0.5rem] rounded-lg">
                                ChatGPT-4o
                            </p>
                            <p>
                                👍 <span className={`${'text-danger'}`}>-1</span> 👎
                            </p>
                        </div>
                    </li>

                    <li className="p-[1.5rem] inline-flex flex-col bg-white rounded-xl gap-[2rem] cursor-pointer">
                        <div className="flex gap-[1rem] flex-wrap w-full">
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег1</p>
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег2</p>
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег3</p>
                        </div>
                        <div className="flex gap-[2rem] justify-start items-center">
                            <div className="bg-gray-300 rounded-full w-[6.4rem] h-[6.4rem]">
                                <img src="#" alt="" />
                            </div>
                            <h3 className="text-[2.4rem]">Заголовок prompt-а</h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[1.8rem] bg-secondary text-white p-[0.5rem] rounded-lg">
                                ChatGPT-4o
                            </p>
                            <p>
                                👍 <span className={`${'text-danger'}`}>-1</span> 👎
                            </p>
                        </div>
                    </li>

                    <li className="p-[1.5rem] inline-flex flex-col bg-white rounded-xl gap-[2rem] cursor-pointer">
                        <div className="flex gap-[1rem] flex-wrap w-full">
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег1</p>
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег2</p>
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег3</p>
                        </div>
                        <div className="flex gap-[2rem] justify-start items-center">
                            <div className="bg-gray-300 rounded-full w-[6.4rem] h-[6.4rem]">
                                <img src="#" alt="" />
                            </div>
                            <h3 className="text-[2.4rem]">Заголовок prompt-а</h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[1.8rem] bg-secondary text-white p-[0.5rem] rounded-lg">
                                ChatGPT-4o
                            </p>
                            <p>
                                👍 <span className={`${'text-success'}`}>+6</span> 👎
                            </p>
                        </div>
                    </li>

                    <li className="p-[1.5rem] inline-flex flex-col bg-white rounded-xl gap-[2rem] cursor-pointer">
                        <div className="flex gap-[1rem] flex-wrap w-full">
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег1</p>
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег2</p>
                            <p className="text-[1.8rem] bg-gray-200 px-[1rem] rounded">#Тег3</p>
                        </div>
                        <div className="flex gap-[2rem] justify-start items-center">
                            <div className="bg-gray-300 rounded-full w-[6.4rem] h-[6.4rem]">
                                <img src="#" alt="" />
                            </div>
                            <h3 className="text-[2.4rem]">Заголовок prompt-а</h3>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[1.8rem] bg-secondary text-white p-[0.5rem] rounded-lg">
                                ChatGPT-4o
                            </p>
                            <p>
                                👍 <span className={`${'text-success'}`}>+6</span> 👎
                            </p>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Main;
