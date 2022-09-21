import React,{useEffect} from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import {useDispatch} from 'react-redux';
import Header from './components/header';
import Posts from './components/posts';
import '../src/app.css'
import PostForm from './components/PostForm';
import Home from './components/Home';
import { getPosts } from './actions/postAction';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

const App = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getPosts());
  },[dispatch]);
  return (
    <>
      <Header/>
      <Routes>
        <Route path = '/' element =  {<Posts/>}/>
        <Route path = '/createpost' element = {<PostForm/>}/>
        <Route path = '/signin' element = {<SignIn/>} />
        <Route path ='/signup' element = {<SignUp/>} />
      </Routes>
    </>
  )
}

export default App

