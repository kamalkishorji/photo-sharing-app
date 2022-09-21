import { AUTH } from '../constants/actionTypes';
import *as api from '../api/index.js';

export const signIn = (formData, navigate)=> async(dispatch)=>{
    try {
        const {data} = await api.singIn(formData);
        console.log("signin action response ", data);
        dispatch({type : AUTH, data});
        navigate('/');
    } catch (error) {
        console.log(error);
    }

};


export const signUp = (formData, navigate)=> async(dispatch)=>{
    try {
        const {data} = await api.signUp(formData);
        console.log("signup action response ", data);
        dispatch({type : AUTH, data});
        navigate('/');
    } catch (error) {
        console.log(error);
    }

};