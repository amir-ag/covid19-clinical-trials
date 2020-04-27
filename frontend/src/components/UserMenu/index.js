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
    const[isSignUpVisible, setSignUpVisibility] = useState(false);
    const[isLogInVisible, setLoginVisibility] = useState(false);

    const logOutHandler = (event) => {
        event.preventDefault();
        props.dispatch(logOutAction(null));
        setOptionsVisible(false);
    }

    const signUpButtonHandler = () => {
        setOptionsVisible(false);
        if(!isSignUpVisible) setLoginVisibility(false);
        setSignUpVisibility(!isSignUpVisible);
    }

    const logInButtonHandler = () => {
        setOptionsVisible(false);
        if(!isLogInVisible) setSignUpVisibility(false);
        setLoginVisibility(!isLogInVisible);
    }

    return (
        <>
            <div className="user-container">
                                                
                <div className={`option-container ${isOptionsVisible ? '' : 'hidden'}`} >
                { !props.authenticated && (  
                    <>  
                        <button onClick={ signUpButtonHandler }>
                            Sign Up
                        </button>
                        <button onClick={ logInButtonHandler }>
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
                isSignUpVisible && (
                    <SignUp visibility={isSignUpVisible} signUpButtonHandler={signUpButtonHandler} />
                ) 
            }
            {
                isLogInVisible && (
                    <LogIn visibility={isLogInVisible} logInButtonHandler={logInButtonHandler} />
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



