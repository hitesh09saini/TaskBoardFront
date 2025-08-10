import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full h-10 bg-[#581845] flex justify-center items-center text-white text-sm select-none">
      <p>© {new Date().getFullYear()} Task Board. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
