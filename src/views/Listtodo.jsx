import axios from 'axios';
import React, { useEffect } from 'react';

export default function Listtodo() {

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState([]);

    const geeetAll = async () => {
        const response = await axios.get("/api/todos")
    }

    useEffect(() => {

    }, []);
    return (
        <div>
            I'M to do List
        </div>
    );
}

