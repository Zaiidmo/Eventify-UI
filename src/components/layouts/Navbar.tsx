"use client";

import { useState, useEffect } from "react";
import { LogOut, Moon, Sun, User } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Link } from "react-router-dom";
import { logout } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);
  const dispatch = useDispatch();

  const notify = ({
    message = "",
    type = "default",
    duration = 6000,
  }: {
    message: string;
    type: "success" | "error" | "loading" | "default";
    duration?: number;
  }) => {
    if (type in toast) {
      (toast[type as keyof typeof toast] as Function)(message, {
        duration,
        position: "bottom-right",
      });
    } else {
      toast(message, {
        duration,
        position: "bottom-right",
      });
    }
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    // { name: "Account", href: "/profile" },
    { name: 'Contact', href: 'https://zaiid.moumni.uk' },
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const logoutUser = () => {
    dispatch(logout());
    notify({
      message: "Logged out successfully",
      type: "success",
    });
  };

  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authenticatedUser = useSelector((state: RootState) => state.auth.user);

  const userRole = authenticatedUser?.role;

  return (
    <nav className="fixed top-0 left-0 right-0 backdrop-filter backdrop-blur-xl bg-gradient-to-b from-white/60 to-white/30 dark:from-black/60 dark:to-black/30 dark:border-b dark:border-gray-900 shadow-lg z-50">
      <div className=" mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:mx-16">
          <div className="flex items-center">
            <a
              href="/"
              aria-label="Eventify — Home"
              className="text-2xl font-semibold text-gray-800 dark:text-white text-shadow"
            >
              <img
                src="/logo.png"
                className=" w-24  hidden md:block"
                alt="Eventify logo by Zaiid Moumni (TheVlpha)"
              />
              <img
                src="/favicon.png"
                className="w-12 block md:hidden"
                alt="Eventify favicon"
              />
            </a>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>{" "}
          </div>
          <div className="flex items-center space-x-4">
            {!isAuth ? (
              <>
                <Link to={"login"}>
                  <Button
                    variant="ghost"
                    className="text-gray-800 bg-transparent dark:text-white hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300 ease-in-out backdrop-blur-md"
                  >
                    Login
                  </Button>
                </Link>
                <Link to={"register"}>
                  <Button
                    variant="outline"
                    className="text-gray-800 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-white/40 dark:hover:bg-gray-700/40 transition-all duration-300 ease-in-out backdrop-blur-md"
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <>
            
                  {userRole === "organizer" && (
                    <Link to={"/dashboard"}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl bg-white/40 dark:bg-black/40 text-gray-800 dark:text-white hover:bg-white/60 dark:hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-300 ease-in-out backdrop-blur-md"
                      >
                        <User />
                      </Button>
                    </Link>
                  )}
                  <Button
                    onClick={logoutUser}
                    variant="ghost"
                    size="icon"
                    className="rounded-xl bg-white/40 dark:bg-black/40 text-gray-800 dark:text-white hover:bg-white/60 dark:hover:bg-gray-800/60 duration-300 ease-in-out backdrop-blur-md"
                  >
                    <LogOut />{" "}
                  </Button>
              </>
            )}

            {/* Dark Mode Toggle Button */}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-xl bg-white/40 dark:bg-black/40 text-gray-800 dark:text-white hover:bg-white/60 dark:hover:bg-gray-800/60 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-300 ease-in-out backdrop-blur-md"
            >
              {darkMode ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">
                {darkMode ? "Switch to light mode" : "Switch to dark mode"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
