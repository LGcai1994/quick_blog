import React, { useState, useEffect } from 'react'
import { db } from '../firebaseConfig'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { DeleteArticle } from './DeleteArticle'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import LikeArticle from "./LikeArticle";
import { Link } from 'react-router-dom'

export default function Articles() {
    const [articles, setArticles] = useState([])
    const [user] = useAuthState(auth)

    useEffect(() => {
        const articleRef = collection(db, 'Articles')
        const q = query(articleRef, orderBy('createdAt', 'desc'))
        onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map((doc) => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ))
            setArticles(articles)
        })
    }, [])

    return (
        <div style={{ marginTop: 70 }} >
            {
                articles.length === 0
                    ?
                    (<p>No article found</p>)
                    :
                    (
                        articles.map(({ id, title, description, imageUrl, createdAt, createdBy, userId, likes, comments }) => (
                            <div key={id} className='border mt-3 p-3 bg-light d-flex align-items-start position-relative'>
                                <div className='me-3'>
                                    <Link to={`/article/${id}`}>
                                        <img src={imageUrl} alt='blog picture' style={{ height: 180, width: 180 }} />
                                    </Link>
                                </div>
                                <div className='flex-grow-1'>
                                    <div className='mb-2'>
                                        {createdBy && (<span className='badge bg-primary me-2'>{createdBy}</span>)}
                                        <span>{createdAt.toDate().toDateString()}</span>
                                    </div>
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                    {user && <LikeArticle id={id} likes={likes} />}
                                </div>
                                <div className='position-relative '>
                                    {user && user.uid === userId && <DeleteArticle id={id} imageUrl={imageUrl} />}
                                </div>
                            </div>
                        ))
                    )
            }
        </div>
    )
}
