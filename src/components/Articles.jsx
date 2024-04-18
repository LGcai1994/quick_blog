import React, { useState, useEffect } from 'react'
import { DeleteArticle } from './DeleteArticle'
import LikeArticle from "./LikeArticle";
import { Link } from 'react-router-dom'
import { auth } from '../firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db } from '../firebaseConfig'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'

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
    const handleOverLengthDesc = (desc) => {
        const maxLen = 188
        const handledDesc = desc.length > maxLen ? desc.substring(0, maxLen) + '...' : desc
        return handledDesc
    }
    return (
        <div style={{ marginTop: 70 }} >
            {
                articles.length === 0
                    ?
                    (<p>No article found</p>)
                    :
                    (
                        articles.map(({ id, title, description, imageUrl, createdAt, createdBy, userId, likes, comments }) => (
                            <div key={id} className='border mt-3 p-3 bg-light d-flex align-items-start'>
                                {/* picture */}
                                <div className='me-3'>
                                    <Link to={`/article/${id}`}>
                                        <img src={imageUrl} alt='blog picture' style={{ height: 180, width: 180 }} />
                                    </Link>
                                </div>
                                {/* main info */}
                                <div className='flex-grow-1 d-flex flex-column'>
                                    {/* name tag & create time */}
                                    <div className=''>
                                        {createdBy && (<span className='badge bg-primary me-2'>{createdBy}</span>)}
                                        <span className='text-muted'>{createdAt.toDate().toDateString()}</span>
                                    </div>
                                    {/* main content */}
                                    <div className='flex-grow-1'>
                                        <h3 className=''>{title}</h3>
                                        <p className='text-justify' >{handleOverLengthDesc(description)}</p>
                                    </div>
                                    {/* showing likes & comments */}
                                    <div className='d-flex'>
                                        <div className='pe-2'>
                                            {user && <LikeArticle id={id} likes={likes} />}
                                        </div>
                                        <div className='pe-2'>
                                            <p className='font-weight-bold'>{likes?.length} likes</p>
                                        </div>
                                        {comments && comments.length > 0 &&
                                            (<div className='d-flex'>
                                                <p>{comments?.length} comments</p>
                                            </div>)
                                        }
                                    </div>
                                </div>
                                {/* delete button */}
                                <div className=''>
                                    {user && user.uid === userId && <DeleteArticle id={id} imageUrl={imageUrl} />}
                                </div>
                            </div>
                        ))
                    )
            }
        </div>
    )
}
