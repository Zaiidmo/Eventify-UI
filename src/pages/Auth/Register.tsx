import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";
import Seo from "@/components/Seo";


export default function Register() {
  return (
    <div className="h-[93vh] flex items-center justify- p-4 w-screen">
    <Seo title="Register — Eventify" description="Create your Eventify account by Zaiid Moumni (TheVlpha)." canonicalPath="/register" />
    <div className="w-full max-w-md space-y-8 p-8 rounded-xl shadow-lg sm:max-w-[425px] md:max-w-screen-md md:mx-auto backdrop-filter backdrop-blur-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-gray-700">
      <div className="text-center">
          <h2 className="mt-6 text-3xl md:text-5xl font-titles font-bold text-gray-900 dark:text-white">
            Get started now
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Join the community and start your adventure today!
          </p>
        </div>
        <RegisterForm/>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
          </span>
          <Link 
            to="/login" 
            className="text-sm font-medium text-black dark:text-white hover:text-primary  transition-colors"
          >
            Login now
          </Link>
        </div>
      </div>
    </div>
  );
}
