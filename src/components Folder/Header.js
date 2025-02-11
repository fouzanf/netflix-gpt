import React, { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  return (
    <header className="absolute w-full px-6 py-3 bg-black bg-opacity-70 z-50 flex flex-col md:flex-row items-center justify-between shadow-lg">
      {/* Logo */}
      <motion.img
        src={LOGO}
        alt="Logo"
        className="w-40 cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate("/browse")}
      />

      {/* User Section */}
      {user && (
        <div className="flex items-center space-x-4 relative">
          {/* Language Selector */}
          {showGptSearch && (
            <select
              className="p-2 bg-gray-900 text-white rounded-lg border border-gray-700 hover:border-purple-400 focus:ring-2 focus:ring-purple-500 transition-all"
              onChange={(e) => dispatch(changeLanguage(e.target.value))}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          {/* GPT Search Toggle */}
          <motion.button
            className="py-2 px-5 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-md hover:from-pink-600 hover:to-red-600 transition-transform hover:scale-105 focus:ring-2 focus:ring-red-400"
            onClick={() => dispatch(toggleGptSearchView())}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </motion.button>

          {/* Profile Picture & Dropdown */}
          <div className="relative">
            <motion.img
              src={user?.photoURL}
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-gray-300 cursor-pointer shadow-md transition-all hover:scale-110"
              onClick={() => setShowDropdown(!showDropdown)}
            />

            {/* Dropdown Menu */}
            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  className="absolute right-0 mt-3 w-48 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700 p-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="px-4 py-2 text-sm text-gray-300">{user.displayName}</p>
                  <p className="px-4 py-2 text-xs text-gray-400">{user.email}</p>
                  <hr className="border-gray-700 my-2" />
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-red-600 rounded-md transition-all"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

