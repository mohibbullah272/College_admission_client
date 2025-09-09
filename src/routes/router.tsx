import ProtectedRoute from "@/components/ProtectedRoute";
import Main from "@/Layout/Main";
import Admission from "@/pages/Admission";
import CollegeDetail from "@/pages/CollegeDetails";
import Colleges from "@/pages/Colleges";
import Home from "@/pages/Home";
import MyCollege from "@/pages/MyCollege";
import MyProfile from "@/pages/MyProfile";
import NotFound from "@/pages/NotFound";
import SigninPage from "@/pages/SignInPage";
import SignupPage from "@/pages/SignupPage";
import { createBrowserRouter } from "react-router";



export const router = createBrowserRouter([
    {
      path: '/',
      Component: Main,
      children: [
        {
          path: '/',
          Component: Home,
        },
        {
          path: '/colleges',
          Component: Colleges,
        },
        {
          path: '/colleges/:id',
          Component: CollegeDetail,
        },
        {
          path: '/my-college',
          element: (
            <ProtectedRoute>
              <MyCollege />
            </ProtectedRoute>
          ),
        },
        {
          path: '/admission',
          element: (
            <ProtectedRoute>
              <Admission />
            </ProtectedRoute>
          ),
        },
        {
          path: '/my-profile',
          element: (
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: '/signin',
      Component: SigninPage,
    },
    {
      path: '/signup',
      Component: SignupPage,
    },
    {
      path: '*',
      Component: NotFound,
    },
  ]);
