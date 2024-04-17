import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db, storage } from '../firebaseConfig'
import { toast } from 'react-toastify'
import { deleteObject, ref } from 'firebase/storage'

export const DeleteArticle = ({ id, imageUrl }) => {
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'Articles', id))
            toast(`Article deleted successfully (blog id:${id})`)
            const storageRef = ref(storage, imageUrl)
            await deleteObject(storageRef)
        } catch (error) {
            toast('error deleting article', { type: 'error' })
            console.log(error)
        }
    }

    return (
        <div>
            <button
                className='btn btn-danger'
                onClick={handleDelete}
            >Delete</button>
        </div>
    )
}
