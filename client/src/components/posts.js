import React from 'react';
import { useSelector } from 'react-redux';
import SinglePost from './SinglePost';


const Posts = () => {
    
    const posts = useSelector((state) =>state.post);
    

    return (
           <div className='container'>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 my-2'>
            { posts.map((post)=>{
            return (
                <div className='col my-2 ' key = {post._id} >
                    <SinglePost post = {post}  />
                </div>
            )
        })}
            </div>
           </div>
    )
}

export default Posts