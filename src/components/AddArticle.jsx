import React, { useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "./../firebaseConfig";
import { toast } from "react-toastify";

export default function AddArticle() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    createdAt: Timestamp.now().toDate()
  })
  const [progress, setProgress] = useState(0)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleImgChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }
  const handlePublish = () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all the fields");
      return;
    }
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
            // createdBy: user.displayName,
            // userId: user.uid,
            // likes: [],
            // comments: []
          })
            .then(() => {
              // 显示成功添加文章的提示消息，并重置上传进度为0
              toast("Article added successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              // 如果保存文章时出现错误，显示错误提示消息
              toast("Error adding article", { type: "error" });
            });
        });
      }
    );
  };

  return (
    <div className='border p-3 mt-3 bg-light' style={{ position: 'fixed' }}>

      {/* title input */}
      <h2>Create Title</h2>
      <label htmlFor=''>Title</label>
      <input
        type='text'
        name='title'
        className='form-control'
        value={formData.title}
        onChange={(e) => handleChange(e)} />

      {/* description input */}
      <label htmlFor="">Description</label>
      <textarea
        name='description'
        className='form-control'
        value={formData.description}
        onChange={(e) => handleChange(e)} />

      {/* picture input */}
      <label htmlFor=''>Picture</label>
      <input
        type='file'
        name='image'
        accept='image/*'
        className='form-control'
        onChange={(e) => handleImgChange(e)} />

      {/* progress bar */}
      {progress === 0 ? null : (
        <div className='progress'>
          <div
            className='progress-bar progress-bar-striped mt-2 text-black text-xl'
            style={{ width: `${progress}%`, height:'3rem'}}>
            `uploading image ${progress}%`
          </div>
        </div>
      )}

      {/* publish button */}
      <button
        className='form-control btn-primary mt-2'
        onClick={handlePublish}>
        Publish
      </button>

    </div>
  )
}
