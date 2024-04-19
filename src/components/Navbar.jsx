import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../auth/AuthContex'

const Navbar = () => {
    const { user, auth } = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div className='fixed-top border'
            style={{ backgroundColor: 'whitesmoke' }}>
            <nav className='navbar'>
                <div>
                    <img
                        src='/kitty.png'
                        width={30}
                        height={30}
                        alt='logo'
                        className='ms-5' />
                </div>
                <Link className='nav-link' to='/'>
                    <h2 className=''>MiLog</h2>
                </Link>
                <div>
                    {user ?
                        (<>
                            <span className='pe-4'>
                                {user.displayName || user.email}
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
                        </>) :
                        (<>
                            <span className='pe-4'>
                                No user
                            </span>
                            <button className='btn btn-primary btn-sm me-3'
                                onClick={() => navigate('/login')}>
                                Login
                            </button>
                            <button className='btn btn-primary btn-sm me-3'
                                onClick={() => navigate('/register')}>
                                Register
                            </button>
                        </>)}
                </div>
            </nav>
        </div>
    )
}

export default Navbar