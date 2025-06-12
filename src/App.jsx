import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AboutUsPage from './pages/home/AboutUs';
import Homepage from './pages/home/Home';
import FindBloodPage from './pages/home/FindBlood';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';
import NewsPage from './pages/news/News';
import NewsDetail from './pages/news/NewsDetail';
import Dashboard from './pages/admin/Dashboard';
import DonorList from './pages/admin/DonorList';
import AddDonor from './pages/admin/AddDonor';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/news",
      element: <NewsPage />,
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
      element: <RegisterPage/>,
    },     {
      path: "/news/:id",
      element: <NewsDetail/>,    },    {
      path: "/admin/dashboard",
      element: <Dashboard/>,
    },    {
      path: "/admin/donor-list",
      element: <DonorList/>,
    },
    {
      path: "/admin/add-donor",
      element: <AddDonor/>,
    },
  ]);
  return (
    <RouterProvider router={router} />
  )
}

export default App