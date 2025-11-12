import { Github, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-gradient-to-b from-white/60 to-white/30 dark:from-black/60 dark:to-black/30 border-t border-gray-200 dark:border-gray-900 shadow-lg z-50">
      <div className="mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between h-fit py-2 md:py-0 md:h-16 md:mx-16 text-center md:text-left">
          <div>
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              © 2025{" "}
              <span>
                Spotted the precision? <span className="font-medium">Yep, that’s</span>{" "}
                <a
                  href="https://zaiid.moumni.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet-800 text-primary font-semibold"
                >
                  TheVlpha
                </a>.
              </span>
            </span>
          </div>

          <div className="flex gap-3 mt-3 md:mt-0">
            <a
              href="https://www.github.com/zaiidmo"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
            >
              <Github />
            </a>
            <a
              href="https://zaiid.moumni.uk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors"
            >
              <Globe />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}