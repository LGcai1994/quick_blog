import React, { useState, useContext } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "./../firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../auth/AuthContex";

export default function AddArticle() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    createdAt: Timestamp.now().toDate()
  })
  const [progress, setProgress] = useState(0)
  const [isPublishing, setIsPublishing] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleImgChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }
  const handleKeyPress = (e) => {
    e.preventDefault()
    if (e.key === 'Enter' && !isPublishing) {
      handlePublish(e)
    }
  }
  const handlePublish = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.description) {
      alert("Please fill all the fields");
      return;
    } else if (isPublishing) {
      alert('Publishing, please wait')
    }

    setIsPublishing(true)
    // user upload a picture
    if (formData.image) {
      // 对应于用户上传图片的存储引用 (storageRef)
      const storageRef = ref(storage, `/images/${Date.now()}${formData.image.name}`);
      // 将图片上传到 Firebase Storage 中
      const uploadImage = uploadBytesResumable(storageRef, formData.image);
      // 监听上传状态, 存在多个回调函数
      uploadImage.on("state_changed",
        // 回调函数计算上传进度
        (snapshot) => {
          const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressPercent);
        },
        // 处理错误回调函数
        (err) => {
          console.log(err);
          setIsPublishing(false)
        },
        // 上传完毕回调函数
        () => {
          setFormData({
            title: "",
            description: "",
            image: "",
          });
          getDownloadURL(uploadImage.snapshot.ref).then((url) => {
            // 创建对应于文章的数据库引用，并保存文章信息到 Firestore 中
            const articleRef = collection(db, "Articles");
            addDoc(articleRef, {
              title: formData.title,
              description: formData.description,
              imageUrl: url,
              createdAt: Timestamp.now().toDate(),
              createdBy: user.displayName,
              userId: user.uid,
              likes: [],
              comments: []
            })
              .then(() => {
                // 显示成功添加文章的提示消息，并重置上传进度为0
                toast("Article added successfully", { type: "success" });
                setProgress(0);
                navigate('/')
              })
              .catch((err) => {
                // 如果保存文章时出现错误，显示错误提示消息
                toast("Error adding article", { type: "error" });
                setIsPublishing(false)
              });
          });
        }
      );
    }
    // user haven't upload a impage
    else {
      const articleRef = collection(db, "Articles");
      addDoc(articleRef, {
        title: formData.title,
        description: formData.description,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/react-firebase-blog-clg1994.appspot.com/o/defaultImage%2Fpaw.png?alt=media&token=853d289b-a9a6-4274-977e-76ad28077d08',
        createdAt: Timestamp.now().toDate(),
        createdBy: user.displayName,
        userId: user.uid,
        likes: [],
        comments: []
      })
        .then(() => {
          // 显示成功添加文章的提示消息，并重置上传进度为0
          toast("Article added successfully", { type: "success" });
          setProgress(0);
          navigate('/')
        })
        .catch((err) => {
          // 如果保存文章时出现错误，显示错误提示消息
          toast("Error adding article", { type: "error" });
          setIsPublishing(false)
        });
    }

  };

  return (
    <>
      {user
        ?
        (<div className='border p-3 bg-light' style={{ marginTop: 70 }} >
          {/* title input */}
          < h2 > Create Title</h2 >
          <label htmlFor=''>Title</label>
          <input
            type='text'
            name='title'
            className='form-control'
            value={formData.title}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) => handleKeyPress(e)}
          />
          {/* description input */}
          <label htmlFor="">Description</label>
          <textarea
            name='description'
            className='form-control'
            value={formData.description}
            onChange={(e) => handleChange(e)}
            onKeyUp={(e) => handleKeyPress(e)}
          />
          {/* picture input */}
          <label htmlFor=''>Picture</label>
          <input
            type='file'
            name='image'
            accept='image/*'
            className='form-control'
            onChange={(e) => handleImgChange(e)}
          />
          {/* progress bar */}
          {progress === 0 ? null : (
            <div className='progress'>
              <div
                className='progress-bar progress-bar-striped mt-2 text-black text-xl'
                style={{ width: `${progress}%`, height: '3rem' }}>
                `uploading image ${progress}%`
              </div>
            </div>
          )}
          {/* publish button */}
          <button
            className='form-control btn-primary mt-2'
            onClick={(e) => handlePublish(e)}
            disabled={isPublishing}>
            Publish
          </button>
        </div >)
        :
        (<div className='border p-3 bg-light' style={{ marginTop: 70 }} >
          <h2>Please login first</h2>
        </div>)}
    </>
  )
}
