import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SimpleErrorFallback from "./components/ui/SimpleErrorFallback";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DonorBlood from "./pages/DonorBlood/DonorBlood";
import Hospitals from "./pages/hospital/hospital";
import DonateConfirm from "./pages/DonorBlood/DonateConfirm";
import TrackDonation from "./pages/DonorBlood/TrackDonation";
import QAPage from "./pages/Q&A/Q&A";
import StaffBloodRequests from "./pages/dashboard-staff/StaffBloodRequests";
import StaffDonorRequests from "./pages/dashboard-staff/StaffDonorRequests";
import DashboardS from "./components/dashboard";
import CreateHospital from "./pages/dashboard-staff/CreateHospital";
import BloodManagement from "./pages/dashboard-staff/BloodManagement";
import BloodSeparation from "./pages/dashboard-staff/BloodSeparation";

// Lazy load components for code splitting
const Homepage = React.lazy(() => import("./pages/home/Home"));
const NewsPage = React.lazy(() => import("./pages/news/News"));
const NewsDetail = React.lazy(() => import("./pages/news/NewsDetail"));
const BlogPage = React.lazy(() => import("./pages/blog/Blog"));
const LoginPage = React.lazy(() => import("./pages/login/login"));
const RegisterPage = React.lazy(() => import("./pages/register/register"));
const AboutUs = React.lazy(() => import("./pages/home/AboutUs"));
const BloodTypePage = React.lazy(() => import("./pages/blood/blood"));
const Dashboard = React.lazy(() => import("./pages/admin/Dashboard"));
const SimpleDashboard = React.lazy(() =>
  import("./components/SimpleDashboard")
);
const DonorList = React.lazy(() => import("./pages/admin/DonorList"));
const AddDonor = React.lazy(() => import("./pages/admin/AddDonor"));
const DonorDetails = React.lazy(() => import("./pages/admin/DonorDetails"));
const BloodRequest = React.lazy(() => import("./pages/blood/BloodRequest"));
const BloodRequests = React.lazy(() => import("./pages/admin/BloodRequests"));
const BlogDetail = React.lazy(() => import("./pages/blog/BlogDetail"));
// const SampleDataCreator = React.lazy(() => import('./components/SampleDataCreator'));

// Loading component for suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Homepage />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/news",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <NewsPage />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/Q&A",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <QAPage />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/news/:id",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <NewsDetail />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/blog",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <BlogPage />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/blog/:id",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <BlogDetail />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/donor-blood",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <DonorBlood />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/hospital",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Hospitals />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/donate-confirm",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <DonateConfirm />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/track-donation",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <TrackDonation />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/bloodtype",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <BloodTypePage />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/blood-request",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <BloodRequest />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/about-us",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <AboutUs />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <LoginPage />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/register",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <RegisterPage />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/staff-request-blood",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <StaffBloodRequests />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/staff-request-donor",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <StaffDonorRequests />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        </ProtectedRoute>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<LoadingSpinner />}>
            <SimpleDashboard />
          </Suspense>
        </ProtectedRoute>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/admin/donors",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<LoadingSpinner />}>
            <DonorList />
          </Suspense>
        </ProtectedRoute>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/admin/add-donor",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<LoadingSpinner />}>
            <AddDonor />
          </Suspense>
        </ProtectedRoute>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/admin/blood-requests",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<LoadingSpinner />}>
            <BloodRequests />
          </Suspense>
        </ProtectedRoute>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/admin/donor-details/:id",
      element: (
        <ProtectedRoute>
          <Suspense fallback={<LoadingSpinner />}>
            <DonorDetails />
          </Suspense>
        </ProtectedRoute>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    {
      path: "/donor-details",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <DonorDetails />
        </Suspense>
      ),
      errorElement: <SimpleErrorFallback />,
    },
    // {
    //   path: "/create-sample-data",
    //   element: (
    //     <Suspense fallback={<LoadingSpinner />}>
    //       <SampleDataCreator />
    //     </Suspense>
    //   ),
    //   errorElement: <SimpleErrorFallback />,
    // },
    // {
    //   path: "/debug",
    //   element: <DebugRoute />,
    //   errorElement: <SimpleErrorFallback />,
    // },
    // {
    //   path: "/test",
    //   element: <TestRoute />,
    //   errorElement: <SimpleErrorFallback />,
    // },
    {
      path: "*",
      element: <SimpleErrorFallback />,
    },
    {
      path: "/DashboardS",
      element: <DashboardS />,
      children: [
        {
          path: "", // Default route - overview
          element: <div>Trang tổng quan</div>,
        },
        {
          path: "overview",
          element: <div>Trang tổng quan</div>,
        },
        {
          path: "donor-blood",
          element: <StaffDonorRequests />,
        },
        {
          path: "blood-request",
          element: <StaffBloodRequests />,
        },
        {
          path: "blood",
          element: <BloodManagement/>,
        },
        {
          path: "create-hospital",
          element: <CreateHospital />,
        },
        {
          path: "create-user",
          element: <div>Tạo user</div>,
        },
        {
          path: "blood-separation",
          element: (
            <Suspense fallback={<LoadingSpinner />}>
              <BloodSeparation />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
