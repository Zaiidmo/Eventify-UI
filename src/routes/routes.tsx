import { RouteObject } from 'react-router-dom'
import Home from '../pages/Home'
import ForgotPassword from '@/pages/Auth/ForgotPassword'
import { ProtectedRoute, PublicRoute } from '@/guards/auth.guard'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import EventsPage from '@/pages/Events'
import Dashboard from '@/pages/Dashboard'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  { 
    path: '/forgot-password',
    element: <PublicRoute><ForgotPassword /></PublicRoute>,
  },
  { 
    path: '/login',
    element: <PublicRoute><Login /></PublicRoute>,
  },
  { 
    path: '/register',
    element: <PublicRoute><Register /></PublicRoute>,
  },
  {
    path: '/events',
    element: <EventsPage />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard/></ProtectedRoute>,
  }
]

export default routes