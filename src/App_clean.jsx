import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AboutUsPage from './pages/home/AboutUs';
import Homepage from './pages/home/Home';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';
import NewsPage from './pages/news/News';
import NewsDetail from './pages/news/NewsDetail';
import BlogPage from './pages/blog/Blog';
import BloodTypePage from './pages/blood/blood';
import Dashboard from './pages/admin/Dashboard';
import SimpleDashboard from './components/SimpleDashboard';
import DebugRoute from './components/DebugRoute';
import DonorList from './pages/admin/DonorList';
import AddDonor from './pages/admin/AddDonor';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorPage from './components/ui/ErrorPage';
import ErrorBoundary from './components/ui/ErrorBoundary';
import TestRoute from './components/TestRoute';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/news",
      element: <NewsPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/news/:id",
      element: <NewsDetail />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/blog",
      element: <BlogPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/bloodtype",
      element: <BloodTypePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/about-us",
      element: <AboutUsPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/test",
      element: <TestRoute />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute requiredRole="admin">
          <DebugRoute/>
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/admin/donor-list",
      element: (
        <ProtectedRoute requiredRole="admin">
          <DonorList/>
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/admin/add-donor",
      element: (
        <ProtectedRoute requiredRole="admin">
          <AddDonor/>
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App
