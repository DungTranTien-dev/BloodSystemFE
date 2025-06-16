import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register';
import NewsPage from './pages/news/News';
import NewsDetail from './pages/news/NewsDetail';
import Header from './components/ui/Header';
import Footer from './components/ui/Footer';
import BlogPage from './pages/blog/Blog';
import Homepage from './pages/home/Home';
import AboutUsPage from './pages/home/AboutUs';
import BloodTypePage from './pages/blood/blood';
import { persistor, store } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Dashboard from './pages/admin/Dashboard';

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
        {
          path: "/bloodtype",
          element: <BloodTypePage />
        },
        {
          path: "/about-us",
          element: <AboutUsPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
     {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  )
}

export default App