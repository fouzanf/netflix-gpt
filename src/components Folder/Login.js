import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';
import {BG_URL} from '../utils/constants';


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
          className='h-screen object-cover md:w-screen'
          src={BG_URL}
          alt='bg-image'
        />
      </div>
      <form 
        onSubmit={(e) => e.preventDefault()} 
        className="w-full max-w-md absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80 shadow-lg flex flex-col items-center space-y-6"
      >
        <h1 className="font-bold text-2xl md:text-3xl text-center">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
  
        <div className="w-full space-y-4">
          {!isSignInForm && (
            <input 
              ref={name} 
              type="text" 
              placeholder="Full Name" 
              className="p-4 w-full bg-gray-700 bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        )}

        <input 
          ref={email} 
          type="text" 
          placeholder="Email Address" 
          className="p-4 w-full bg-gray-700 bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
    
        <input 
          ref={password} 
          type="password" 
          placeholder="Password" 
          className="p-4 w-full bg-gray-700 bg-opacity-80 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
  
      {errorMessage && <p className="text-red-500 font-semibold text-lg text-center">{errorMessage}</p>}

      <button 
        className="p-4 w-full bg-red-700 rounded-lg font-semibold text-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500"
        onClick={handleButtonClick}
      >
        {isSignInForm ? "Sign In" : "Sign Up"}
      </button>

      <p className="text-center cursor-pointer hover:underline text-gray-300" onClick={toggleSignInForm}>
        {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}
      </p>
      </form>

    </div>
  )
}

export default Login
