import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import { signUp }  from '../../actions/authAction';

const initialState = {fName:'',lName:'',email:'', password :'',confirmPassword:''};
const SignUp = () => {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onsubmit = (e)=>{
        e.preventDefault();
        dispatch(signUp(formData,navigate));
        console.log(formData);
        setFormData(initialState);
    };

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});
    }
    return (
        <div className='container'>
            <div className='row my-3'>
                <div className='col  d-flex justify-content-center'>
                    <div className='form-container'>
                    <form onSubmit={onsubmit}>
                        <div className='row'>
                            <div className='col'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">First Name</label>
                                    <input 
                                      type="text" 
                                      className="form-control" 
                                       
                                      aria-describedby="emailHelp" 
                                      name = "fName"
                                      onChange={handleChange}
                                      />
    
                                </div>
                            </div>
                            <div className='col'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Last Name</label>
                                    <input  onChange={handleChange} name = "lName" type="text" className="form-control" aria-describedby="emailHelp" />
                                    
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input  onChange={handleChange} name = "email" type="email" className="form-control"  aria-describedby="emailHelp" />
                            
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input  onChange={handleChange} name = "password" type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                            <input  onChange={handleChange} name ='confirmPassword' type="password" className="form-control" />
                        </div>
                       
                        <button type="submit" className="btn btn-primary s-button">Sign Up</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SignUp