import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DeleteUser() {
    const [user, setUser] = useState(null);
    const [deleted,setDeleted] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const storedInfo = localStorage.getItem('userinfo');
        if (!storedInfo) {
            navigate("/login");
        } else {
            setUser(JSON.parse(storedInfo));
            console.log("storedInfo:", storedInfo);
        }
    }, [navigate]);

    async function deleteUser(e) {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const result = await res.json();
        if (result.success) {
            localStorage.removeItem('userinfo');
            setDeleted(result.message);
            setTimeout(()=>{
                navigate('/signup')
            },2000)
            

        }
    }

    return (
        <div id="signup-form">
            <form onSubmit={deleteUser}>
                {!deleted && <h1>Delete User</h1>}
                {deleted && <h1>Deleting User</h1>}
                <h2>Current User</h2>
                {user && <h3>username: {user.name}</h3>}
                {user && <h3>email: {user.email}</h3>}
                <input type="submit" value='Delete' id='submit'/>
            </form>
        </div>
    )
}

export default DeleteUser;