import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebaseConfig'
import { arrayRemove, arrayUnion, updateDoc, doc } from 'firebase/firestore'

const LikeArticle = ({ id, likes }) => {
    const [user] = useAuthState(auth)
    const likesRef = doc(db, 'Articles', id)

    const handleLike = () => {
        // cancel like operation
        if (likes?.includes(user.uid)) {
            updateDoc(likesRef, {
                likes: arrayRemove(user.uid)
            }).then(() => {
                console.log('unliked')
            }).catch((e) => {
                console.log(e)
            })
        }
        // like operation
        else {
            updateDoc(likesRef, {
                likes: arrayUnion(user.uid)
            }).then(() => {
                console.log('liked')
            }).catch((e) => {
                console.log(e)
            })
        }
    }

    return (
        <div>
            <i
                className={`fa fa-heart${!likes?.includes(user.uid) ? '-o' : ''} fa-lg`}
                style={{ cursor: 'pointer', color: likes?.includes(user.uid) ? 'red' : null }}
                onClick={handleLike} />
        </div>
    )
}

export default LikeArticle