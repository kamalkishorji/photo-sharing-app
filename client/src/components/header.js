import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';



const Header = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) { 
                logout(); 
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location]);
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        navigate('/signin');
        setUser(null);
    }
    return (
        <div className='nav-bar '>
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse nav-link-container" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item mx-2 ">
                                <Link to="/" className='nav-link'>Posts</Link>
                            </li>
                           {(user && user.token)? ( <li className="nav-item">
                                <Link to='/createpost' className='nav-link'>Create Post</Link>
                            </li>):''}
                           {!user &&  <li className="nav-item mx-2">
                                <Link to='/signin' className='nav-link'>Login</Link>
                            </li>}
                            {user && <li className="nav-item mx-2" onClick={logout}>
                                <Link to='/signin' className='nav-link'>Logout</Link>
                            </li>}
                        </ul>
                       {user &&  <div className='d-flex align-items-center mx-5'>
                            <button className="btn btn-light rounded-circle mx-2">
                            <i className="fa-regular fa-user"></i>
                            </button>
                            <h6>{user?.result?.name}</h6>
                        </div>}
                    </div>
                    
                </div>
            </nav>
           
        </div>
    )
}

export default Header