import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Dashboard() {
    const [user, setUser] = useState(null);
    const [isloggedIn, setIsLoggedIn] = useState(true);
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const navigate = useNavigate()
    useEffect(() => {
        const storedInfo = localStorage.getItem('userinfo');
        if (!storedInfo) {
            navigate("/login");
        } else {
            const parsed = (JSON.parse(storedInfo));
            setUser(parsed);
            fetch(`http://localhost:3000/todos/${parsed.id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setTodos(data.todos);
                    }
                });
        }
    }, []);

    const addTodo = async () => {
        if (task) {
            const res = await fetch("http://localhost:3000/add-todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userid: user.id,
                    task: task,
                })

            }

            );
            const data = await res.json();

            if (data.success) {
                setTodos(data.todos);
                setTask("");
            }
        };
    }

    const deleteTodo = async (id) => {
        const res = await fetch("http://localhost:3000/del-todos", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid: user.id,
                taskId: id
            })
        });
        const data = await res.json();
        if (data.success) {
            setTodos(data.todos);
        }
    }


    return (
        <div id='dashboard'>
            {!isloggedIn && <img src="https://media.tenor.com/s-J6vqs61fkAAAAM/bye-pikachu.gif"></img>}
            {isloggedIn && <h1>You are Logged In</h1>}
            {!isloggedIn && <h1>You are being Logged Out ...</h1>}
            {user &&
                <h2>{user.email}</h2>}
            {user &&
                <h2>Welcome <span id="username">{user.name}!</span></h2>}
            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a task"
            />

            <input id="submit" type="submit" value='Add' onClick={addTodo} />

            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>{todo.task} <button id="logout" onClick={() => { deleteTodo(todo._id) }}>Delete</button></li>
                ))}
            </ul>
            <button id="logout" onClick={() => {
                localStorage.removeItem('userinfo');
                setIsLoggedIn(false)
                setTimeout(() => {
                    navigate('/login')
                }, 1500)

            }}>
                Logout
            </button>
            <Link className="Link" to='/delete'>Delete User ?</Link>
        </div>
    )
}

export default Dashboard;