import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-10 bg-[#581845] flex justify-center gap-2 items-center text-white text-sm select-none">
      <p>© {new Date().getFullYear()} Task Board. All rights reserved.</p>

      <a
        className="text-blue-400 hover:text-blue-600"
        href="https://hitesh-folio.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Author: Hitesh Saini
      </a>
    </footer>
  );
};

export default Footer;
