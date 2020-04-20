import React, { useState,  useEffect } from 'react';
import './style.css';

export default function LogIn(props) {
    const [email, setEmailName] = useState('');
    const [password, setPassword] = useState('');

    const nextButtonHandler = (event) => {
        event.preventDefault();
        props.logInButtonHandler()
        //dispatch action
    }

    return (
        <>
            <form className={`form-login-container ${props.visibility ? '' : 'hidden'}`}>
                <h1>Login</h1>
                <div className="form-tab">
                    <p>Login Information:</p>
                    <input type="email" placeholder="E-mail..." value={email} onChange={ event => setEmailName(event.target.value) } />
                    <input type="password" placeholder="Password..." value={password} onChange={ event => setPassword(event.target.value) } />
                </div>
                
                <div className="btn-container" >
                    <button type="button" onClick={nextButtonHandler} >Next</button>
                </div>
            </form>
        </>
    )
}
