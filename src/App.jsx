import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import AboutUsPage from './pages/home/AboutUs';
import FindBloodPage from './pages/home/FindBlood';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';
import NewsPage from './pages/news/News';
import NewsDetail from './pages/news/NewsDetail';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import BlogPage from './pages/blog/Blog';
import Homepage from './pages/home/Home';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      ),
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/news",
          element: <NewsPage />,
        },
        {
          path: "/news/:id",
          element: <NewsDetail />,
        },
        {
          path: "/blog",
          element: < BlogPage />
        },
      ],
    },

    {
      path: "/about-us",
      element: <AboutUsPage />,
    },
    {
      path: "/find-blood",
      element: <FindBloodPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },

    // {
    //   path: "/news/:id",
    //   element: <NewsDetail />,
    // },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App