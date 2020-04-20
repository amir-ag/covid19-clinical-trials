import React, { useState,  useEffect } from 'react';
import './style.css';

export default function SignUp(props) {
    const [email, setEmail] = useState('');
    const [code, setValidationCode] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [registerStep, setRegisterStep] = useState(0);
    const [isInputFieldValid, setValidInputField] = useState(-1);

    useEffect(() => {
        formStepIndicator(0);
    }, [])

    // const prevButtonHandler = (event) => {
    //     event.preventDefault();
    //     formStepIndicator(registerStep - 1);
    //     setRegisterStep(registerStep - 1);
    // }

    const nextButtonHandler = (event) => {
        event.preventDefault();

        if(registerStep < 2) {
            formStepIndicator(registerStep + 1);
            setRegisterStep(registerStep + 1);
        }
        else {
            formStepIndicator(0);
            setRegisterStep(0);
            props.signUpButtonHandler();

            //dispatch
        }

    }

    const formStepIndicator = (step) => {
        const steps = document.getElementsByClassName("step");
        for (let i = 0; i < steps.length; i++) {
        // remove active class from all form steps
        steps[i].className = steps[i].className.replace(" active", "");
        }
        // add the active class to the current form step
        steps[step].className += " active";
      }

    // const formValidator = (tabNumber) => {
    //     const allTabes = document.getElementsByClassName("tab");
    //     const inputFields = allTabes[tabNumber].getElementsByTagName("input");

    //     for (let i = 0; i < inputFields.length; i++) {
    //       // if an input field is empty...
    //       if (inputFields[i].value == '') {
    //         // add the "invalid" class to the input field:
    //         inputFields[i].className += " invalid";
    //         setValidInputField(i);
    //       }
    //     }
    //     return true;
    // }

    return (
        <>
            
            <form className={`form-signup-container ${props.visibility ? '' : 'hidden'}`} >
                {
                    registerStep == 0 ?
                        <>
                            <h1>Sign Up</h1>
                            <div className="form-tab">
                                <input type="email" placeholder="E-mail" value={email} onChange={ event => setEmail(event.target.value) } />
                            </div>
                        </>
                    : null 
                }
                {
                    registerStep == 1 ?
                    <>
                        <div className="form-tab">
                            <h1>Congratulations</h1>
                            <p>We have sent a confirmation code to your email { email }</p>    
                        </div>
                    </>
                    : null 
                }
                {
                    registerStep == 2 ?
                    <>
                        <h1>Verification</h1>
                        <div className="form-tab">
                            <input type="text" placeholder="Code" value={code} onChange={ event => setValidationCode(event.target.value) } />
                            <input type="email" placeholder="E-mail..." value={email} onChange={ event => setEmail(event.target.value) } />
                            <input type="text" placeholder="Username" value={username} onChange={ event => setUsername(event.target.value) } />
                            <input type="password" placeholder="Password" value={password} onChange={ event => setPassword(event.target.value) } />
                            <input type="password" placeholder="Password Repeat" value={passwordRepeat} onChange={ event => setPasswordRepeat(event.target.value) } />
                        </div>
                    </>
                    : null 
                }
                <div className="btn-container" >
                    {/* {
                        registerStep > 0 ?
                            <button type="button" id="prev-btn" onClick={prevButtonHandler} >Previous</button>
                        : null 
                    } */}
                    <button type="button" onClick={nextButtonHandler} >Next</button>
                </div>
    
                <div className="steps-container">
                    <span className="step"></span>
                    <span className="step"></span>
                    <span className="step"></span>
                </div>
            </form>
        </>
    )
}
