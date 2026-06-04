"use client";

import { useState } from "react";
import Logo from "./logo";

export default function () {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const links = ["Home", "Movies", "TV Shows", "People"];

  return (
    <nav className="relative">
      {/* Main bar */}
      <div className="flex items-center justify-between px-4 h-20 bg-white dark:bg-black border-b border-black/10 dark:border-white/10">
        {/* Logo */}
        {/* <div className="flex items-center gap-2"> */}
        <Logo className="h-19 text-black dark:text-white" />
        {/* </div> */}

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => setActive(link)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                active === link
                  ? "text-[#E8000F]"
                  : "text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10"
              }`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Desktop search */}

          {/* Mobile search toggle */}

          {/* Avatar */}

          {/* Hamburger */}
          <button
            className="sm:hidden flex flex-col gap-[5px] p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-[22px] h-[2px] bg-black dark:bg-white rounded transition-all duration-200 origin-center ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block w-[22px] h-[2px] bg-black dark:bg-white rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-[22px] h-[2px] bg-black dark:bg-white rounded transition-all duration-200 origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile search bar */}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden flex flex-col border-b border-black/10 dark:border-white/10 bg-white dark:bg-black">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => {
                setActive(link);
                setMenuOpen(false);
              }}
              className={`px-5 py-3 text-left text-sm transition-colors ${
                active === link
                  ? "text-[#E8000F]"
                  : "text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

//     {/* Right side */}
//     <div className="flex items-center gap-2">
//       {/* Desktop search */}
//       <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-black/10 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-400 text-sm cursor-pointer hover:border-black/20 dark:hover:border-white/20 transition-colors">
//         <svg
//           width="14"
//           height="14"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <circle cx="11" cy="11" r="8" />
//           <path d="m21 21-4.35-4.35" />
//         </svg>
//         Search
//       </div>

//       {/* Mobile search toggle */}
//       <button
//         className="sm:hidden p-1.5 text-gray-500"
//         onClick={() => setSearchOpen((o) => !o)}
//         aria-label="Toggle search"
//       >
//         <svg
//           width="20"
//           height="20"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//         >
//           <circle cx="11" cy="11" r="8" />
//           <path d="m21 21-4.35-4.35" />
//         </svg>
//       </button>

//       {/* Avatar */}
//       <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center text-xs font-medium text-gray-500 cursor-pointer">
//         JD
//       </div>

//       {/* Hamburger */}
//       <button
//         className="sm:hidden flex flex-col gap-[5px] p-1"
//         onClick={() => setMenuOpen((o) => !o)}
//         aria-label="Toggle menu"
//       >
//         <span
//           className={`block w-[22px] h-[2px] bg-black dark:bg-white rounded transition-all duration-200 origin-center ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
//         />
//         <span
//           className={`block w-[22px] h-[2px] bg-black dark:bg-white rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`}
//         />
//         <span
//           className={`block w-[22px] h-[2px] bg-black dark:bg-white rounded transition-all duration-200 origin-center ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
//         />
//       </button>
//     </div>
//   </div>

//   {/* Mobile search bar */}
//   {searchOpen && (
//     <div className="sm:hidden px-4 py-2.5 border-b border-black/10 dark:border-white/10">
//       <input
//         autoFocus
//         type="text"
//         placeholder="Search movies, shows, people…"
//         className="w-full px-3 py-2 text-sm rounded-lg border border-black/10 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-black dark:text-white outline-none focus:border-black/20 dark:focus:border-white/20"
//       />
//     </div>
//   )}

//   {/* Mobile menu */}
//   {menuOpen && (
//     <div className="sm:hidden flex flex-col border-b border-black/10 dark:border-white/10 bg-white dark:bg-black">
//       {links.map((link) => (
//         <button
//           key={link}
//           onClick={() => {
//             setActive(link);
//             setMenuOpen(false);
//           }}
//           className={`px-5 py-3 text-left text-sm transition-colors ${
//             active === link
//               ? "text-[#E8000F]"
//               : "text-gray-500 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5"
//           }`}
//         >
//           {link}
//         </button>
//       ))}
//     </div>
//   )}
