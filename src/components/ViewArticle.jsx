import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebaseConfig'
import { doc, onSnapshot } from 'firebase/firestore'
import Comment from './Comment'
import { AuthContext } from '../auth/AuthContex'
import LikeArticle from './LikeArticle'

const ViewArticle = () => {
    const { user } = useContext(AuthContext)
    const { id } = useParams()
    const [article, setArticle] = useState(null)

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
                            <div className='d-flex align-items-center'>
                                {user && <p className='my-2 pe-2'>{article.likes.length}</p>}
                                {user && <LikeArticle id={id} likes={article.likes} />}
                            </div>
                            <hr />
                            <p>{article.description}</p>
                            <Comment id={article.id} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ViewArticle