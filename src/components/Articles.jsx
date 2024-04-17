import React, { useState, useEffect } from 'react'
import { db } from '../firebaseConfig'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { DeleteArticle } from './DeleteArticle'

export default function Articles() {
    const [articles, setArticles] = useState([])

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
        <div>
            {
                articles.length === 0
                    ?
                    (<p>No article found</p>)
                    :
                    (
                        articles.map(({ id, title, description, imageUrl, createdAt }) => (
                            <div key={id} className='border mt-3 p-3 bg-light'>
                                <div className='row'>
                                    <div className='col-4'>
                                        <img src={imageUrl} alt='blog picture' style={{ height: 180, width: 180 }} />
                                    </div>
                                    <div className='col-6 ps-3'>
                                        <h2>{title}</h2>
                                        <p>{createdAt.toDate().toDateString()}</p>
                                        <h4>{description}</h4>
                                    </div>
                                    <div className='col-2 d-flex justify-content-end align-items-end'>
                                        <DeleteArticle id={id} imageUrl={imageUrl} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )
            }
        </div>
    )
}
