import Link from 'next/link';
import React from 'react';

const Footer = () => (
  <footer className="bg-gray-700 py-10">
    <div className="container mx-auto">
      <div className="flex items-center text-center justify-between p-10">
        <div className='text-left'>
          <Link href="/">
            <h2 className="text-violet-500 text-4xl hover:text-violet-400 font-bold mb-2">
              Quizers
            </h2>
          </Link>
          <p className='text-gray-200 font-thin ml-2'>Aim High, Excel Beyond Limits.</p>
        </div>
        <p className="text-white text-sm">© 2023 All rights reserved</p>
        <div className="flex flex-col">
          <Link href="/message" className="text-white text-sm mr-5 hover:text-violet-400 mb-2">
            About
          </Link>
          <Link href="/message" className="text-white text-sm mr-5 hover:text-violet-400 mb-2">
            Contact
          </Link>
          <Link href="/message" className="text-white text-sm mr-5 hover:text-violet-400">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
