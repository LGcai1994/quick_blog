import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebaseConfig.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassowrd] = useState('')
    const navigate = useNavigate()

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(auth.currentUser, { displayName: name })
            toast(`Register successfully!`)
            navigate('/')
        } catch (error) {
            toast(error.code, { type: 'error' })
            console.log(error)
        }
    }

    return (
        <div className='border p-3 bg-light mx-auto' style={{ maxWidth: 400, marginTop: 70 }}>
            <h1>Register</h1>
            <div className='form-group'>
                <label>Name</label>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Enter your name'
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
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
                <label>Password</label>
                <input
                    type="password"
                    className='form-control'
                    placeholder='Enter your password'
                    onChange={(e) => setPassowrd(e.target.value)}
                />
            </div>
            <br />
            <button
                className='btn btn-primary'
                onClick={handleSignup}>
                Register
            </button>
        </div>
    )
}

export default Register