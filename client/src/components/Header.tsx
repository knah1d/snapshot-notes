'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/authService';
import { UserData } from '@/types/auth';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

  // Check if user is logged in and get user data
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = AuthService.isAuthenticated();
      setIsLoggedIn(isAuth);
      
      if (isAuth) {
        const user = AuthService.getCurrentUser();
        setUserData(user);
      } else {
        setUserData(null);
      }
    };
    
    // Check on initial load
    checkAuth();
    
    // Set up an event listener for storage changes (for multi-tab support)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    setIsLoggedIn(false);
    setUserData(null);
    setShowProfileMenu(false);
    // Redirect to home
    router.push('/');
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/next.svg" 
              alt="Snapshot Notes Logo" 
              width={120} 
              height={30} 
              className="dark:invert"
            />
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-white">
              Home
            </Link>
            <Link href="/notes" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-white">
              Notes
            </Link>
            {isLoggedIn && (
              <Link href="/profile" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-white">
                Profile
              </Link>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2"
                  onClick={toggleProfileMenu}
                >
                  {userData?.avatar ? (
                    <Image 
                      src={userData.avatar} 
                      alt="Profile" 
                      width={32} 
                      height={32} 
                      className="rounded-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-medium">
                      {userData?.initials || 'U'}
                    </div>
                  )}
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-medium text-gray-800 dark:text-white">{userData?.firstName} {userData?.lastName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{userData?.email}</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                      Your Profile
                    </Link>
                    <Link href="/notes" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                      Your Notes
                    </Link>
                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                      Settings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white">
                  Log in
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
            
            <button 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden"
              onClick={toggleMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {showMenu && (
          <div className="md:hidden mt-4 pb-2">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-white"
                onClick={() => setShowMenu(false)}
              >
                Home
              </Link>
              <Link 
                href="/notes" 
                className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-white"
                onClick={() => setShowMenu(false)}
              >
                Notes
              </Link>
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/profile" 
                    className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-white"
                    onClick={() => setShowMenu(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    className="text-left text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-white"
                    onClick={() => {
                      handleLogout();
                      setShowMenu(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/auth/login" 
                    className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-white"
                    onClick={() => setShowMenu(false)}
                  >
                    Log in
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-white"
                    onClick={() => setShowMenu(false)}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
