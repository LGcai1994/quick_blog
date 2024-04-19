import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db, storage } from '../firebaseConfig'
import { toast } from 'react-toastify'
import { deleteObject, ref } from 'firebase/storage'

export const DeleteArticle = ({ id, imageUrl }) => {
    const handleDelete = async () => {
        if (window.confirm('Are you sure to delete your blog?')) {
            try {
                await deleteDoc(doc(db, 'Articles', id))
                toast(`Article deleted successfully (blog id:${id})`)
                // check if it is default picture
                // won't delete default picture
                if (imageUrl !== 'https://firebasestorage.googleapis.com/v0/b/react-firebase-blog-clg1994.appspot.com/o/defaultImage%2Fpaw.png?alt=media&token=853d289b-a9a6-4274-977e-76ad28077d08') {
                    const storageRef = ref(storage, imageUrl)
                    await deleteObject(storageRef)
                }
            } catch (error) {
                toast('error deleting article', { type: 'error' })
                console.log(error)
            }
        }
    }

    return (
        <div>
            <i
                className='fa fa-times'
                style={{ cursor: 'pointer' }}
                onClick={handleDelete}
            />
        </div>
    )
}
