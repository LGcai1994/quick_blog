import React from 'react'
import { db } from '../firebaseConfig'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import LikeArticle from './LikeArticle'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import Comment from './Comment'

const ViewArticle = () => {
    const { id } = useParams()
    const [article, setArticle] = useState(null)
    const [user] = useAuthState(auth)

    useEffect(() => {
        const docRef = doc(db, 'Articles', id)
        onSnapshot(
            docRef,
            (snapshot) => {
                setArticle({ ...snapshot.data(), id: snapshot.id })
            })
    }, [])

    return (
        <div className='container border bg-light' style={{ marginTop: 70 }}>
            {
                article && (
                    <div className='row'>
                        <div className='col-3'>
                            <img src={article.imageUrl}
                                alt={article.title}
                                style={{ width: '100%', padding: 10 }}
                            />
                        </div>
                        <div className='col-9 mt-3'>
                            <h2>{article.title}</h2>
                            <h5>Author:{article.createdBy}</h5>
                            <div>Posted on: {article.createdAt.toDate().toDateString()}</div>
                            <hr />
                            <p>{article.description}</p>
                            <div className='d-flex flex-row-reverse'>
                                {user && <LikeArticle id={id} likes={article.likes} />}
                                <div className='pe-2'>
                                    <p>{article.likes.length}</p>
                                </div>
                            </div>
                            <Comment id={article.id} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ViewArticle