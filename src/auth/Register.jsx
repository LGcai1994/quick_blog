import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../firebaseConfig.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassowrd] = useState('')
    const [rePassword, setRePassowrd] = useState('')
    const navigate = useNavigate()

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSignup()
        }
    }

    const handleSignup = async () => {
        if (!name || !password || !rePassword) {
            toast('Please fill up the table!', { type: 'error' })
        } else if (password !== rePassword) {
            toast('Password are not the same!', { type: 'error' })
        }
        else {
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
                    onChange={(e) => {
                        setName(e.target.value)
                        setEmail(e.target.value + '@outlook.com')
                        return
                    }}
                    onKeyUp={handleKeyPress}
                />
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input
                    type="password"
                    className='form-control'
                    placeholder='Enter your password'
                    onChange={(e) => setPassowrd(e.target.value)}
                    onKeyUp={handleKeyPress}
                />
            </div>
            <div className='form-group'>
                <label>RePassword</label>
                <input
                    type="password"
                    className='form-control'
                    placeholder='Enter your password again'
                    onChange={(e) => setRePassowrd(e.target.value)}
                    onKeyUp={handleKeyPress}
                />
            </div>
            <br />
            <div>
                <p>Mark your name and password for login~</p>
            </div>
            <button
                className='btn btn-primary'
                onClick={handleSignup}>
                Register
            </button>
        </div>
    )
}

export default Register