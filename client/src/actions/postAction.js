import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import *as api from '../api/index.js';


export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        console.log('Fetch post response ---', data);
        dispatch({ type: FETCH_ALL, payload: data });

    } catch (err) {
        console.log(err.message)
    }

};

export const createPost = (post) => async (dispatch) => {
    try {

        const { data } = await api.createPost(post);
        console.log('create post response ', data);
        dispatch({ type: CREATE, payload: data });
    } catch (err) {
        console.log(err.message);

    }

};

export const updatePost = (id, post) => async (dispatch) => {
    try {

        const { data } = await api.updatePost(id, post);
        console.log("update response ..", data);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }

};

export const likePost = (post) => async (dispatch) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    try {
        if (user) {
            let likes = post.likes;
            const idx = post.likes.findIndex(userId => userId === user?.result?._id);
            if (idx === -1) {
                likes.push(user?.result?._id);

            } else {
                likes = likes.filter(userId => userId !== user?.result?._id);
            }
            post.likes = likes;
           
        }
        dispatch({ type: LIKE, payload: post });
         await api.likePost(post._id, post);
        //console.log("likes response----",data);
        
    } catch (error) {
        console.log(error);
    }

};

export const deletePost = (id) => async (dispatch) => {

    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });

    } catch (error) {
        console.log(error);
    }

};