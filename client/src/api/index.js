import axios from 'axios';

//const url = 'http://localhost:5000/posts';
const API = axios.create({baseURL : ''});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
export const fetchPosts = ()=> API.get('/posts');
export const createPost = (newPost)=> API.post('/posts',newPost);
export const updatePost = (id,updatedPost) => API.patch(`/posts/${id}`,updatedPost);
export const likePost = (id,post)=> API.patch(`/posts/${id}/likePost`,post);
export const deletePost = (id)=>API.delete(`/posts/${id}`);

export const singIn = (formData)=> API.post('/user/signin', formData);
export const signUp = (formData)=>API.post('/user/signup',formData);
