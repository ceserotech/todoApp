import { useState } from "react";
import "../index.css";

const Home = () => {
  const [darkMode, setDarkMode] = useState("");
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (input.trim() === "") return; // prevent empty todos

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const clearCompleted = () => {
    setTodos(todos.filter((item) => !item.completed));
  };

  return (
    <div
      className={`${darkMode ? "dark" : ""} min-h-screen bg-gray-100 dark:bg-black transition`}
    >
      <div className="absolute top-0 left-0 w-full h-52 md:h-72 bg-[url('/images/bg-desktop-light.jpg')] dark:bg-[url('/images/bg-desktop-dark.jpg')] md:bg-[url('/images/bg-mobile-light.jpg')] md:dark:bg-[url('/images/bg-mobile-dark.jpg')] bg-cover bg-no-repeat"></div>

      {/* CONTENT */}
      <main className="relative max-w-xl mx-auto px-6 pt-10 md:pt-16">
        <header className="flex justify-between items-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold tracking-[0.5em]">
            TODO
          </h1>
          <button
            onClick={() => {
              darkMode == "" ? setDarkMode("dark") : setDarkMode("");
            }}
          >
            {darkMode == "" ? (
              <img src="/images/icon-moon.svg" alt="" />
            ) : (
              <img src="/images/icon-sun.svg" alt="" />
            )}
          </button>
        </header>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-md shadow-lg flex items-center outline-0 px-4 py-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
            placeholder="Create a new todo..."
            className="w-full p-3 rounded-md bg-white dark:bg-gray-800 dark:text-gray-400"
          />
        </div>

        {/* TODO list */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden">
          
          <div className="flex items-center justify-between px-4 py-3 ">
            <ul className="w-10/10">
              {filteredTodos.map((list) => {
                return (
                  <div className="w-full flex items-center gap-3 p-3 border-b">
                    <div className="w-full flex items-center gap-3">
                      <div className="w-5 h-5 ">
                        <input
                          type="checkbox"
                          checked={list.completed}
                          onChange={() => toggleTodo(list.id)}
                        />
                      </div>
                      <li key={list.id} className=" dark:text-gray-300">
                        <span
                          className={`${
                            list.completed ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {list.text}
                        </span>
                      </li>
                    </div>
                    <button onClick={() => deleteTodo(list.id)}>
                      <img src="./images/icon-cross.svg" alt="" />
                    </button>
                  </div>
                );
              })}
            </ul>
          </div>

          {/* footer section */}
          <div className="flex justify-between items-center px-4 py-3 text-sm text-gray-500">
            <span>
              {todos.filter((item) => !item.completed).length} items left
            </span>

            <div className="flex gap-4 hidden md:flex">
              <button onClick={() => setFilter("all")}>All</button>

              <button onClick={() => setFilter("active")}>Active</button>
              <button onClick={() => setFilter("completed")}>Completed</button>
            </div>
            <button onClick={clearCompleted}>Clear Completed</button>
          </div>

         
        </div>
        <div className="mt-20 text-center"><span className="text-gray-300">drag and drop</span></div>
           
        {/* for mobile */}
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-md shadow-lg flex justify-center gap-6 py-3 md:hidden">
          <button className="text-blue-500" onClick={() => setFilter("all")}>All</button>

              <button onClick={() => setFilter("active")}>Active</button>
              <button onClick={() => setFilter("completed")}>Completed</button>
        </div>
      </main>
    </div>
  );
};

export default Home;
