import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from './AuthContex'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin()
        }
    }

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            toast(`Login successfully!`)
            navigate('/')
        } catch (error) {
            toast(error.code, { type: 'error' })
            console.log(error)
        }
    }

    return (
        <div className='border p-3 bg-light mx-auto' style={{ maxWidth: 400, marginTop: 70 }}>
            <h1>Login</h1>
            <div className='form-group'>
                <label>UserName</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value + '@outlook.com')}
                    onKeyUp={handleKeyPress}
                />
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input
                    type="password"
                    className='form-control'
                    placeholder='Enter your passowrd'
                    onChange={(e) => setPassowrd(e.target.value)}
                    onKeyUp={handleKeyPress}
                />
            </div>
            <br />
            <button
                className='btn btn-primary'
                onClick={handleLogin}>
                Login
            </button>
        </div>
    )
}

export default Login