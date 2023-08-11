import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { userStateContext } from '../context/ContextProvider';
import "../index.css"


export default function Listtodo() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser, userToken } = userStateContext();

    if (!userToken) {
        return <Navigate to='singup' ></Navigate>
    }

    else {
        const getAllTodos = async () => {
            try {
                const response = await axios.get("/api/todos");
                setTodos(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des tâches :", error);
                setLoading(false);
            }
        };

        useEffect(() => {
            getAllTodos();
        }, []);

        return (
            <div>
                {loading ? (
                    <div class="progress">
                        <p>loading</p>
                        <div class="color"></div>
                    </div>
                ) : (
                    <ul>
                        {todos.map(todo => (
                            <li key={todo.id}>{todo.title}</li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

