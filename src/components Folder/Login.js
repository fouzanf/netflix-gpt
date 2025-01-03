import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';


const Login = () => {

  const [isSignInForm, setIsSignInForm] = useState(true);
  const  [errorMessage,setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    try {
      const message = checkValidData(
        email.current?.value,
        password.current?.value,
        name.current?.value
      );
      setErrorMessage(message);
      if (message) return;
  
      if (!isSignInForm) {
        // Sign-up logic
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
            updateProfile(user, {
              displayName: name.current?.value, 
              photoURL: USER_AVATAR,
            }).then(() => {
              // Profile updated and Then Navigate
              const {uid, email, displayName, photoURL} = auth.currentUser;
              dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            }).catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });
          })
          .catch((error) => {
            setErrorMessage(`${error.code} - ${error.message}`);
          });
      } else {
        // Sign-in logic
        signInWithEmailAndPassword(auth, email.current.value, password.current.value)
          .then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            setErrorMessage(`${error.code} - ${error.message}`);
          });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm); 
  }

  
  return (
    <div >
      <Header/>
      <div className='absolute'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/03ad76d1-e184-4d99-ae7d-708672fa1ac2/web/IN-en-20241111-TRIFECTA-perspective_149877ab-fcbd-4e4f-a885-8d6174a1ee81_large.jpg'
          alt='bg-image'
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
      <h1 className='font-bold text-3xl py-4'>{isSignInForm ?  "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (<input ref={name} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700 bg-opacity-80' />)}
        <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 bg-opacity-80 ' />
        <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700 bg-opacity-80' />
        <p className='text-red-500 font-bold text-lg p-2'>{errorMessage}</p>
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ?  "Sign In" : "Sign Up"}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ?  "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}</p>
      </form>
    </div>
  )
}

export default Login
