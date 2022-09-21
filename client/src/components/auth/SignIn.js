import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {GoogleLogin} from 'react-google-login';
import {useDispatch} from 'react-redux';
import { signIn } from '../../actions/authAction';

const initialState = {email:'', password :''};
const SignIn = () => {
    const [formData,setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const googleSuccess = async(res)=>{
    //    const result = res?.profileObj;
    //    const token = res?.tokenId

    //    try {
    //      dispatch({type : 'AUTH', payload : {result, token}});
    //    } catch (error) {
    //      console.log(error);
    //    }
    // }
    // const googleFailure = (err) => {
    //     console.log(err);
    // }
    const onsubmit = (e)=>{
        e.preventDefault();
        dispatch(signIn(formData,navigate));
        console.log('Sign in form dtata : ', formData);
        setFormData(initialState);
    }
    const handleOnChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    return (
        <div className='container'>
            <div className='row my-5'>
            <div className='col d-flex justify-content-center'>
                <div className='form-container' >
                <form onSubmit={onsubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input onChange={handleOnChange} name = 'email' value={formData.email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input onChange={handleOnChange} name = 'password' value={formData.password} type="password" className="form-control" id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary s-button">Log In</button>

                </form>
                {/* <GoogleLogin
                   clientId='458328716132-ns6qjhibsheqdj9no3umnmo4mff7f1jk.apps.googleusercontent.com'
                   //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
                   render={(renderProps)=>(
                    <button 
                       className="btn btn-primary my-2 s-button" 
                       onClick={renderProps.onClick}
                       disabled = {renderProps.disabled} 
                       >Sign In with Google</button>
                   )}
                   onSuccess = {googleSuccess}
                   onFailure = {googleFailure}
                   cookiePolicy={'single_host_origin'}
                /> */}
                <div id="emailHelp" className="form-text">Don't have account <Link to='/signup'>Sign Up</Link>.</div>
            </div>
            </div>
            
        </div>
        </div>
    )
}

export default SignIn