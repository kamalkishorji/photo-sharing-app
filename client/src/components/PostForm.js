import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import FileBase from 'react-file-base64';
import { createPost, updatePost } from '../actions/postAction'

const PostForm = () => {
    const [postData, setPostData] = useState({ name: '', title: '', message: '', tags: '', selectedFile: '' });
    const dispatch = useDispatch();
    const { state } = useLocation();
    const navigate = useNavigate();
    
   
    useEffect(() => {
        if(state){
            setPostData({...state});
        }
        
    }, [state]);
    const submitPost = () => {
        let user = JSON.parse(localStorage.getItem('profile'));
        //console.log("user --------", user?.result?.name);
        //console.log(state);
        if (state) {
            console.log('updating .......')
            dispatch(updatePost(state._id, postData));
            navigate('/');
            clear();
        }
        if (!state) {
            dispatch(createPost({...postData,name:user?.result?.name}));
            console.log("post data ----",postData);
            navigate('/')
            clear();
        }
    }
    const clear = () => {
        setPostData({ name: '', title: '', message: '', tags: '', selectedFile: '' });
    }

    return (
        <div className='container'>
            <div className='row my-3'>
                <div className='col d-flex justify-content-center'>
                    <div className='form-container'>
                    <div className='mb-3 text-center'>
                        <h4>Create a post </h4>
                    </div>
                    {/* <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Creater's Name"
                            value={postData.name}
                            onChange={(e) => setPostData({ ...postData, name: e.target.value })}
                        />
                    </div> */}
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            value={postData.title}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder='Message'
                            value={postData.message}
                            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                        ></textarea>

                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tags comma seperated"
                            value={postData.tags}
                            onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                        />
                    </div>
                    <div className="mb-3">
                        {/* <input 
                   className="form-control"
                    type="file"
                    id="formFile"

                 /> */}
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                        />
                    </div>
                    <div className='mb-3'>
                        <button
                            className='btn btn-primary s-button'
                            onClick={submitPost}
                        >Submit</button>
                    </div>
                    <div className='mb-3'>
                        <button
                            className='btn btn-primary s-button'
                            onClick={clear}
                        >Clear</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default PostForm