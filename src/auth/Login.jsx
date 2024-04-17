import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    const navigate = useNavigate()

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
                <label>Email</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className='form-group'>
                <label>Passowrd</label>
                <input
                    type="password"
                    className='form-control'
                    placeholder='Enter your passowrd'
                    onChange={(e) => setPassowrd(e.target.value)}
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