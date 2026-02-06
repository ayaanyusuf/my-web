import './Signup.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Signup() {
    const navigate = useNavigate();
    const [signedIn,setSignedIn] = useState(false)
    const [data, setData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [message, setMessage] = useState('');
    const [messageClr, setMessageClr] = useState('');
    const [loading, setLoading] = useState(false)

    function handleChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        setData({ username: '', email: '', password: '' })
        const result = await res.json();
        if (result.success == true) {
            setSignedIn(true)
            setMessage(result.message);
            setMessageClr('green');
            setLoading(true)
            setTimeout(() => {
                navigate('/Login')
            }, 2500)
        }
        else {
            setMessage(result.message)
            setMessageClr('red')
        }
    }

    return (
        <div id="signup-form">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit} id='form'>
                <div>
                    {/* <label htmlFor='username'>Username:</label> */}
                    <input type='text' placeholder='Username' name='username' id='username' required minLength={5} maxLength={12} value={data.username} onChange={handleChange} />
                </div>
                <div>
                    {/* <label htmlFor='email'>Email:</label> */}
                    <input type='email' placeholder='Email' name='email' id='email' required value={data.email} onChange={handleChange} />
                </div>
                <div>
                    {/* <label htmlFor='password'>Password:</label> */}
                    <input type='password' placeholder='Password' name='password' id='password' minLength={8} maxLength={15} required value={data.password} onChange={handleChange} />
                </div>
                <input type="submit" value="Register" id='submit' />
                {message && <p style={{ color: messageClr }}>{message}{loading && <img id='loading' src='https://i0.wp.com/lordlibidan.com/wp-content/uploads/2019/03/Running-Pikachu-GIF.gif?fit=480%2C342&ssl=1'></img>}</p>}
                {!signedIn &&<p style={{ margin: 0 }}>Already Signed Up ?</p>}
                {!signedIn && <Link className='Link' to='/Login'>Log In</Link>}

            </form>

        </div>
    )
}

export default Signup