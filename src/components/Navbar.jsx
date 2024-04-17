import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import { signOut } from 'firebase/auth'


const Navbar = () => {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    return (
        <div className='fixed-top border'
            style={{ backgroundColor: 'whitesmoke' }}>
            <nav className='navbar'>
                <div>
                    <img
                        src='logo192.png'
                        width={30}
                        height={30}
                        alt='logo'
                        className='ms-5' />
                </div>
                <Link className='nav-link' to='/'>
                    <h2 className=''>Milog</h2>
                </Link>
                <div>
                    {
                        user
                            ?
                            (
                                <>
                                    <span className='pe-4'>
                                        Login as {user.displayName || user.email}
                                    </span>
                                    <button className='btn btn-primary btn-sm me-3'
                                        onClick={() => navigate('/addArticle')}>
                                        NewBlog
                                    </button>
                                    <button className='btn btn-danger btn-sm me-3'
                                        onClick={() => {
                                            signOut(auth)
                                            navigate('/')
                                        }}>
                                        Logout
                                    </button>
                                </>
                            )
                            :
                            (
                                <>
                                    <span className='pe-4'>
                                        No user now
                                    </span>
                                    <button className='btn btn-primary btn-sm me-3'
                                        onClick={() => navigate('/login')}>
                                        Login
                                    </button>
                                    <button className='btn btn-primary btn-sm me-3'
                                        onClick={() => navigate('/register')}>
                                        Register
                                    </button>
                                </>
                            )
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar