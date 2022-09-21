import React from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { likePost, deletePost } from '../actions/postAction';

const SinglePost = ({post}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse( localStorage.getItem('profile'));
   // console.log("user------", user);

    const handleEdit = (post)=>{
         navigate('/createpost', {state : post});
    }
  return (
            <div className="card ">
                 <div className="post-img-container">
                <img src={post.selectedFile} className="card-img-top post-img" alt="..." />
                <div className='edit-icon-container'>
                {(user?.result._id === post?.creator)? (
                   
                   <p className = "edit-icon text-end">
                       <strong onClick={()=>handleEdit(post)}>&#xFE19;</strong></p>
                   
               ):""}
                </div>
                </div>
                <div className="card-body" style={{height : "250px"}}>
                    <div className='row '>
                        <div className='col'>
                           <h6>{post.name}</h6>
                        </div>
                        <div className='col text-end'>
                            <h6>{moment(post.createdAt).fromNow()}</h6>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                        <h2>{post.title}</h2>
                        </div>
                    </div>
                    <h6 className="card-title">{ post.tags.map(tag=>`#${tag} `)}</h6>
                    <p className="card-text">{post.message}</p>
                    <div className='row'>
                        <div className='col d-flex'>
                            <button 
                               className='btn btn-primary d-flex justify-content-center small-btn'  
                               onClick={() => dispatch(likePost(post))}
                               data-bs-toggle="tooltip" 
                               data-bs-placement="right" 
                               title="Like"
                               >
                            <i className="fa-solid fa-thumbs-up" style={{fontSize : "12px"}}></i>
                           
                           </button>
                           <span className='mx-3'>{(post && post.likes) ?(post.likes.includes(user?.result._id))? `You and ${post.likes.length-1} others`:post.likes.length: ""}</span>
                        </div>
                        {(user?.result?._id === post?.creator)? (
                            <div className='col d-flex justify-content-end'>
                            <button 
                               className='btn btn-danger  d-flex justify-content-center small-btn'
                               onClick={() => dispatch(deletePost(post._id))}
                               data-bs-toggle="tooltip" 
                               data-bs-placement="right" 
                               title="Delete Post"
                               >
                            <i className="fa-solid fa-trash" style={{fontSize : "12px",}}></i>
                            </button>
                        </div>
                        ):" "}
                        
                    </div>
                    
                </div>
            </div>
           
  )
}

export default SinglePost