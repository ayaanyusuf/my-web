import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Dashboard() {
    const [user, setUser] = useState(null);
    const [isloggedIn, setIsLoggedIn] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const storedInfo = localStorage.getItem('userinfo');
        if (!storedInfo) {
            navigate("/login");
        } else {
            setUser(JSON.parse(storedInfo));
            console.log("storedInfo:", storedInfo);
        }
    }, [])
    return (
        <div id='dashboard'>
            {!isloggedIn && <img src="https://media.tenor.com/s-J6vqs61fkAAAAM/bye-pikachu.gif"></img>}
            {isloggedIn && <h1>You are Logged In</h1>}
            {!isloggedIn && <h1>You are being Logged Out ...</h1>}
            {user &&
                <h2>{user.email}</h2>}
            {user &&
                <h2>Welcome <span id="username">{user.name}!</span></h2>}
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