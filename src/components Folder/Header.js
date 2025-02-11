import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
    
  }

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    // Unsubscribe When Component unmounts 
    return () => unsubscribe();
  },[]);

  const handleGptSearchClick = () => {
    // Toggle GPT Search Butt on
     dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between  '>
        <img className='w-44 mx-auto md:mx-0'
         src={LOGO}
         alt='Logo'
        />
        {user && (
          <div className='flex p-2 justify-between'>
            {showGptSearch &&
              (<select
  className="p-3 m-2 bg-gray-900 text-white font-semibold rounded-lg shadow-md border border-gray-700 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300 ease-in-out"
  onChange={handleLanguageChange}
>
  {SUPPORTED_LANGUAGES.map((lang) => (
    <option key={lang.identifier} value={lang.identifier} className="bg-gray-900 text-white">
      {lang.name}
    </option>
  ))}
</select>
)}
              <button
                    className="py-2 px-6 mx-4 my-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-md hover:from-pink-600 hover:to-red-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
                    onClick={handleGptSearchClick}
              >                
              {showGptSearch ? "Homepage" : "GPT Search"}
              </button>
          <img className='hidden md:block w-12 h-12' alt='user-icon' src={user?.photoURL} />
          <button onClick={handleSignOut} className='font-bold text-white '>(Sign Out)</button>
        </div>
        )}
    </div>
  )
}

export default Header
