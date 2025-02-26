import React from 'react';
import { Button } from './ui/button';

interface HeaderProps {
  setIsDrawerOpen: (isOpen: boolean) => void;
  username: string;
  router: any;
}

const Header: React.FC<HeaderProps> = ({ setIsDrawerOpen, username, router }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="mr-10 ml-3 py-4 flex justify-between items-center">
        <div className="flex">
          <Button
            className="text-black mr-5"
            onClick={() => setIsDrawerOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900 my-1 mx-auto">
            Missing Person Tracker for {username}
          </h1>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-gray-800"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-gray-800"
            onClick={() => router.push("/register")}
          >
            Register
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;