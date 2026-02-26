import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
        id:''
    })
    const [message, setMessage] = useState('');
    const [loading,setLoading] = useState(false);
    const [loggedIn,setLoggedIn] = useState(false)


    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if (result.success) {
            localStorage.setItem('userinfo',JSON.stringify(result.userinfo));
            setLoggedIn(true)
            setMessage(result.message);
            setLoading(true)
            setTimeout(() => {
                navigate('/Dashboard')
            }, 2500)


        }
        else if (!result.success) {
            setMessage(result.message)
        }
    }

    return (
        <div id="signup-form">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <div className='holders'>
                {/* <label htmlFor='email'>Email:</label> */}
                <input type='email' placeholder='Email' name='email' id='email' required value={data.email} onChange={handleChange} />
                </div>
                <div className='holders'>
                {/* <label htmlFor='password'>Password:</label> */}
                <input type='password' placeholder='Password' name='password' id='password' minLength={8} maxLength={15} required value={data.password} onChange={handleChange} />
                </div>
                <input type="submit" value="Submit" id='submit' />
                {message && <p>{message}{loading && <img id='loading' src='https://i0.wp.com/lordlibidan.com/wp-content/uploads/2019/03/Running-Pikachu-GIF.gif?fit=480%2C342&ssl=1'></img>}</p>}
                {!loggedIn && < Link to='/Signup' className='Link'>Don't have an account? Sign Up</Link>}
            </form>
        </div>
    )
}

export default Login;