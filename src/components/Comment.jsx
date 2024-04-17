import React, { useEffect, useState } from 'react'
import { db } from '../firebaseConfig'
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'
import { v4 as uuidv4 } from 'uuid'

const Comment = ({ id }) => {
    // leave new comment
    const [comment, setComment] = useState('')
    // get comment from firebase
    const [comments, setComments] = useState([])
    const [currentUser] = useAuthState(auth)
    const commentRef = doc(db, 'Articles', id)

    useEffect(() => {
        const docRef = doc(db, 'Articles', id)
        onSnapshot(
            docRef,
            (snapShot) => {
                setComments(snapShot.data().comments)
            })
    }, [])

    const handleDeleteComment = (comment) => {
        updateDoc(commentRef, {
            comments: arrayRemove(comment),
        }).then((e) => {
            console.log(e);
        }).catch((error) => {
            console.log(error);
        })
    };
    const handleChangeComment = (e) => {
        if (e.key === 'Enter') {
            updateDoc(commentRef, {
                comments: arrayUnion({
                    user: currentUser.uid,
                    userName: currentUser.displayName,
                    comment: comment,
                    createdAt: new Date(),
                    commentId: uuidv4()
                })
            }).then(
                () => {
                    setComment('')
                }
            )
        }
    }

    return (
        <div>
            <div className='container'>
                comments:
                {
                    comments !== null &&
                    comments.map(
                        ({ commentId, user, comment, userName, createdAt }) => (
                            <div key={commentId}>
                                <div className='border p-2 mt-2 row'>
                                    <div className='col-11'>
                                        <span className={`badge ${user === currentUser.uid
                                            ? 'bg-success'
                                            : 'bg-primary'}`}>
                                            {userName}
                                        </span>
                                        {comment}
                                    </div>
                                    <div className='col-1'>
                                        {user === currentUser.uid && (
                                            <i className='fa fa-times' style={{ cursor: 'pointer' }} onClick={() => handleDeleteComment({ commentId, user, comment, userName, createdAt })}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
                {
                    currentUser && (
                        <input
                            type="text"
                            className="form-control mt-4 mb-5"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Add a comment'
                            onKeyUp={(e) => { handleChangeComment(e) }} />
                    )
                }
            </div>
        </div>
    )
}

export default Comment