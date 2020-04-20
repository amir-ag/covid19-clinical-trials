import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logOutAction } from '../../store/actions/userLogoutAction';
import SignUp from '../SignUp';
import LogIn from '../LogIn';

import './style.css';

import userIconLogin from '../../assets/images/userIconLogin.svg';
import userIconLogout from '../../assets/images/userIconLogout.svg';

function UserMenu(props) {
    const[isOptionsVisible, setOptionsVisible] = useState(false);
    const[showForm, setShowForm] = useState("none");

    const logOutHandler = (event) => {
        event.preventDefault();
        props.dispatch(logOutAction(null));
        setOptionsVisible(false);
        setShowForm('none');
    }

    return (
        <>
            <div className="user-container">
                                                
                <div className={`option-container ${isOptionsVisible ? '' : 'hidden'}`} >
                { !props.authenticated && (  
                    <>  
                        <button onClick={() => setShowForm("signUp")}>
                            Sign Up
                        </button>
                        <button onClick={() => setShowForm("logIn")}>
                            Login
                        </button>
                    </>
                )} 
                { props.authenticated && (   
                    <button onClick={ logOutHandler }>
                        Logout
                    </button>
                )} 
                </div>
                <div>
                    <button onClick={() => setOptionsVisible(!isOptionsVisible)}>
                        <img src={props.authenticated ? userIconLogin : userIconLogout } alt="user icon"/>
                    </button>
                </div>
            </div>
 
            {
                showForm === 'signUp' && (
                    <SignUp />
                ) 
            }
            {
                showForm === 'logIn' && (
                    <LogIn />
                ) 
            }
        </>
    )
}

const mapStateToProps = ({ userLoginReducer: { authenticated } }) => {
    return {
        authenticated: authenticated
    };
}

export default connect(mapStateToProps)(UserMenu);



