import React, { useEffect, useState } from 'react';
import axiosClient from '../axios';
import { ToastContainer, toast } from 'react-toastify';


export default function Listtodo() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [newBody, setNewBody] = useState('');
    const [userid, setUserid] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedBody, setUpdatedBody] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    // Filter todos to exclude completed todos
    const todosToDisplay = todos.filter((todo) => !todo.isdoned);

    // Filter completed todos
    const completedTodos = todos.filter((todo) => todo.isdoned);

    useEffect(() => {
        fetchTodos();
        fetchUserId();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axiosClient.get('/todos');
            setTodos(response.data);
            setIsLoading(false);
        } catch (error) {
            setError('Error fetching todos.');
            setIsLoading(false);
        }
    };

    const fetchUserId = async () => {
        try {
            const response = await axiosClient.get('/GetAuthUser');
            if (response.data) {
                setUserid(response.data.id);
            } else {
                localStorage.removeItem('TOKEN');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    const addTodo = async () => {
        try {
            const response = await axiosClient.post('/todos', {
                title: newTodo,
                body: newBody,
                isdoned: 0,
                user_id: userid
            });
            setNewTodo('');
            setNewBody('');
            fetchTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axiosClient.delete(`/todos/${id}`);
            fetchTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleToggleDone = async (id, isDone) => {
        try {
            await axiosClient.put(`/todos/${id}`, { isdoned: isDone ? 1 : 0 });
            fetchTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const updateTodo = async () => {
        try {
            await axiosClient.put(`/todos/${selectedTodo.id}`, {
                title: updatedTitle,
                body: updatedBody
            });
            fetchTodos();
            setUpdatedTitle('');
            setUpdatedBody('');
            setIsPopupOpen(false);
            setSelectedTodo(null);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-8 lg:px-16">
            <h1 className="text-3xl font-semibold my-4 text-orange-600">To-do list ✏️</h1>
            <div className="mt-4 my-4 flex flex-col sm:flex-row items-center sm:items-start">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="px-4 py-2 border rounded-lg mb-2 sm:mb-0 sm:mr-2"
                    placeholder="Title"
                />
                <input
                    type="text"
                    value={newBody}
                    onChange={(e) => setNewBody(e.target.value)}
                    className="px-4 py-2 border rounded-lg mb-2 sm:mb-0 sm:mr-2"
                    placeholder="Description"
                />
                <button
                    onClick={addTodo}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                >
                    Add Todo
                </button>
            </div>

            <h2 className="text-xl font-semibold my-4 text-orange-600">À faire </h2>
            <ul className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="p-4 text-red-600 bg-red-100">{error}</p>
                ) : (
                    todosToDisplay.map((todo) => (
                        <li
                            key={todo.id}
                            className={`px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between ${todo.isdoned ? 'bg-gray-100' : ''}`}
                        >
                            <div className="mb-2 sm:mb-0 sm:flex-grow">
                                <span className={`font-semibold ${todo.isdoned ? 'line-through' : ''}`}>
                                    {todo.title}
                                </span>
                                <p className="text-gray-600">{todo.body}</p>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={todo.isdoned}
                                        onChange={() => handleToggleDone(todo.id, !todo.isdoned)}
                                        className="form-checkbox h-5 w-5 text-green-400 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    />
                                    <span className="ml-2">Fait</span>
                                </label>
                                <button
                                    onClick={() => {
                                        setSelectedTodo(todo);
                                        setUpdatedTitle(todo.title);
                                        setUpdatedBody(todo.body);
                                        setIsPopupOpen(true);
                                    }}
                                    className="ml-2 px-2 py-1 bg-orange-300 text-white rounded-lg hover:bg-orange-400"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="ml-2 px-2 py-1 bg-red-300 text-white rounded-lg hover:bg-red-400"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            <h2 className="text-xl font-semibold my-4 text-green-600">Fait</h2>
            <ul className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="p-4 text-red-600 bg-red-100">{error}</p>
                ) : (
                    completedTodos.map((todo) => (
                        <li
                            key={todo.id}
                            className={`px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between`}
                        >
                            <div className="mb-2 sm:mb-0 sm:flex-grow">
                                <span className={` font-semibold ${todo.isdoned ? 'line-through' : ''}`}>
                                    {todo.title}

                                </span>
                                <p className="text-gray-600">{todo.body}</p>
                            </div>
                            <div className="flex items-center mt-2 sm:mt-0">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={todo.isdoned}
                                        onChange={() => handleToggleDone(todo.id, !todo.isdoned)}
                                        className="form-checkbox h-5 w-5 text-green-400 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    />
                                    <span className="ml-2">Fait</span>
                                </label>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
                    <div className="bg-white p-4 rounded-lg w-full sm:max-w-md">
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                            className="px-2 py-1 border rounded-lg mb-2"
                            placeholder="Title"
                        />
                        <input
                            type="text"
                            value={updatedBody}
                            onChange={(e) => setUpdatedBody(e.target.value)}
                            className="px-2 py-1 border rounded-lg mb-2"
                            placeholder="Description"
                        />
                        <div className="flex justify-end mt-2">
                            <button
                                onClick={updateTodo}
                                className="px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="ml-2 px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}