import Head from "next/head";
import { useEffect, useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/solid";

const API_BASE = "http://localhost:3001";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    fetch(API_BASE + "/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error(error));
  };

  const setComplete = async (id) => {
    const data = await fetch(API_BASE + "/todo/complete/" + id, {
      method: "PUT",
    }).then((res) => res.json());
    getTodos();
  };

  const deleteTodo = async (id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "DELETE",
    }).then((res) => res.json());
    getTodos();
  };

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));

    getTodos();
    setIsPopupActive(false);
    setNewTodo("");
  };

  return (
    <div className="bg-gray-800">
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="realtive p-5 outline-none border-0 min-h-screen max-h-auto bg-gray-800 text-white">
          <div className="">
            <h1 className="text-3xl font-bold text-center">Welcome, Abhinn</h1>
            <h1 className="text-gray-300 text-lg font-light p-3 text-left">
              YOUR TASKS
            </h1>
            {todos &&
              todos.map((todo) => (
                <div
                  key={todo._id}
                  className="flex flex-row items-center gap-x-5 p-4 bg-gray-900 rounded-lg 
        transition duration-200 mb-3 hover:opacity-95 hover:shadow-md"
                >
                  <div
                    className={`w-[20px] h-[20px] rounded-full bg-gray-700 
                transition duration-150 cursor-pointer ${
                  todo.complete && "bg-gradient-to-b from-red-500 to-purple-900"
                }`}
                    onClick={() => setComplete(todo._id)}
                  ></div>
                  <p
                    className={`text-md flex-grow text-gray-200 ${
                      todo.complete && "line-through"
                    }`}
                  >
                    {todo.text}
                  </p>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="bg-red-600 p-2 rounded-lg 
                  transition duration-300 ease-out active:scale-90 hover:scale-105"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <div
              onClick={() => setIsPopupActive(true)}
              className="absolute bottom-10 right-10 w-max p-3 bg-gradient-to-br from-red-500 to-purple-900
            shadow-2xl rounded-full cursor-pointer transition duration-300 ease-out 
            hover:scale-110 active:scale-90"
            >
              <PlusIcon className="w-[30px] h-[30px]" />
            </div>

            {isPopupActive && (
              <div
                className="fixed top-[50%] left-[50%] 
              transform translate-x-[-50%] translate-y-[-50%]
              w-[100%] max-w-[400px] bg-gray-200 text-black p-9
              rounded-2xl shadow-2xl"
              >
                <button
                  className="absolute top-[16px] right-[16px]
                  bg-red-500 p-1 rounded-lg flex justify-center
                  transition duration-200 ease-in-out
                  shadow-md hover:shadow-lg"
                  onClick={() => setIsPopupActive(false)}
                >
                  <XIcon className="w-[20px] h-[20px] transition duration-150 text-gray-100 hover:text-white" />
                </button>
                <h1 className="text-lg md:text-xl font-semibold uppercase mb-[10px]">
                  Add Tasks
                </h1>

                <div className="rounded-xl bg-white p-4 shadow-md">
                  <input
                    className="bg-transparent w-[100%] border-none outline-none text-gray-800"
                    type="text"
                    placeholder="Add your Task"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                  />
                </div>
                <button
                  className="px-10 py-4 rounded-full mt-[16px]
                  bg-gradient-to-br from-red-500 to-purple-600
                  text-sm text-center uppercase font-bold text-white
                  transition duration-250 ease-out shadow-lg hover:shadow-2xl
                  hover:scale-105 active:scale-90"
                  onClick={() => (newTodo ? addTodo() : ``)}
                >
                  Create Task
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
