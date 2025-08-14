import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LogoImage from "@/assets/images/interswitch_logo.svg";
import { FadeIn } from "../custom/Animation";
import { useAppSelector } from "@/store/store";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { showToast } from "@/lib/toast";

const avatar = "https://i.pravatar.cc/40?img=3";

const navLinks = [
  { name: "Accounts", path: "/account-summary" },
  { name: "Transfer", path: "/transfer" },
];

const Navbar: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    navigate("/login");
    showToast("Logged out!");
  };

  return (
    <nav
      className="bg-[#ffffff] text-primary h-18 shadow-md px-6 py-3 sticky top-0 z-50"
      style={{
        boxShadow: "0 2px 6px -4px var(--color-primary, #007bff)",
      }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="font-bold text-2xl tracking-wide">
          <FadeIn direction="down" delay={0.6}>
            <img src={`${LogoImage}`} className="relative z-10 w-48 m-auto" />
          </FadeIn>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link, index) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <FadeIn direction="left" delay={(index * 1) / 10} key={link.name}>
                <Link
                  key={link.name}
                  to={link.path}
                  className={`transition-colors pb-1 font-medium border-b-2 ${
                    isActive
                      ? "text-secondary-400 border-secondary-400 font-semibold"
                      : "border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              </FadeIn>
            );
          })}

          <FadeIn direction="left" delay={0.3}>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((open) => !open)}
                className="flex items-center cursor-pointer focus:outline-none bg-transparent border-none p-0"
              >
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full mr-3 border-2 border-secondary-400"
                />
                <span className="font-medium">{user.name}</span>
                <svg
                  className="ml-2"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+0.5rem)] bg-white text-secondary-800 min-w-[160px] shadow-lg rounded-lg z-10 py-2">
                  <button
                    className="w-full bg-transparent border-none text-secondary-800 px-6 py-3 text-left cursor-pointer font-medium text-base rounded-lg transition-colors hover:bg-[#f1f5f8]"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </FadeIn>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setDropdownOpen((open) => !open)}
            className="flex items-right cursor-pointer text-primary"
            aria-label="Open menu"
          >
            <span className="material-icons">menu</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-6 top-16 bg-white text-secondary-800 min-w-[180px] shadow-lg rounded-lg z-50 py-2 flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-6 py-3 text-left font-medium text-base rounded-lg transition-colors hover:bg-[#f1f5f8] ${
                    location.pathname.startsWith(link.path)
                      ? "text-secondary-400 font-semibold"
                      : ""
                  }`}
                  onClick={() => setDropdownOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button
                className="w-full bg-transparent border-none text-secondary-800 px-6 py-3 text-left cursor-pointer font-medium text-base rounded-lg transition-colors hover:bg-[#f1f5f8]"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
