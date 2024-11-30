import { Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <nav className="fixed -bottom-0 left-0 right-0 backdrop-filter backdrop-blur-xl bg-gradient-to-b from-white/60 to-white/30 dark:from-black/60 dark:to-black/30 border-b border-gray-200 dark:border-gray-900 shadow-lg z-50">
      <div className=" mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:mx-16">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025{" "}
            <a
              href="/"
              className="hover:underline hover:text-primary text-gray-500 font-bold"
            >
              Eventify™
            </a>
            . All Rights Reserved.
          </span>{" "}
          <a href="https://www.vlpha.tech" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-primary">
            <Linkedin className="" />
          </a>
        </div>
      </div>
    </nav>
  );
}
