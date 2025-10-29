import { Link } from 'react-router-dom'
import LoginForm from '@/components/auth/LoginForm'
import Seo from '@/components/Seo'



export default function Login() {
  return (
    <div className="h-[93vh] flex items-center justify- p-4 w-screen">
      <Seo title="Log in — Eventify" description="Log in to Eventify by Zaiid Moumni (TheVlpha)." canonicalPath="/login" />
      <div className="w-full max-w-md space-y-8 p-8 rounded-xl shadow-lg sm:max-w-[425px] md:max-w-screen-md md:mx-auto backdrop-filter backdrop-blur-xl bg-white/60 dark:bg-black/60 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <h2 className="mt-6 font-titles text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Log in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginForm/>
        <div className="mt-4 text-center">
          <Link 
            to="/forgot-password" 
            className="text-sm font-medium text-primary hover:text-black dark:hover:text-white transition-colors"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
          </span>
          <Link 
            to="/register" 
            className="text-sm font-medium text-black dark:text-white hover:text-primary dark:text-primary-light dark:hover:text-primary transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}