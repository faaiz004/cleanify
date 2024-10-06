import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { lazy, Suspense } from "react";

// importing the layouts
import Navbar from "../layout/Navbar/Index";
import ProtectedRoute from "./Private/Index";
import PublicRoute from "./Public/Index";
import SideBar from "../layout/SideBar/Index";

// Lazy load the components
const Home = lazy(() => import("../pages/Home/Index"));
const Register = lazy(() => import("../pages/Register/Index"));
const Signin = lazy(() => import("../pages/Signin/Index"));
const AboutUs = lazy(() => import("../pages/AboutUs/Index"));
const MainBody = lazy(() => import("../pages/Main/Index"));
const ContainerOverview = lazy(() => import("../pages/ContainerOverview/Index"));
const AddContainer = lazy(() => import("../pages/AddContainer/Index"));

const NavbarLayout: React.FC = () => {
  return (
    <PublicRoute>
      <>
        <Navbar />
        <Outlet />
      </>
    </PublicRoute>
  );
};

const SideBarLayout: React.FC = () => {
  return (
    <ProtectedRoute>
        <SideBar />
    </ProtectedRoute>
  );
}

export default function RouterComponent() {
  return (
    <Router>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>...Loading</div>}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <Suspense fallback={<div>...Loading</div>}>
                <Register />
              </Suspense>
            }
          />
          <Route
            path="/signin"
            element={
              <Suspense fallback={<div>...Loading</div>}>
                <Signin />
              </Suspense>
            }
          />
        <Route
          path="/aboutus"
          element={
            <Suspense fallback={<div>...Loading</div>}>
              <AboutUs />
            </Suspense>
          }
        />
        </Route>
        <Route element={<SideBarLayout />}>
          <Route
            path="/main"
            element={
              <Suspense fallback={<div>...Loading</div>}>
                <MainBody />
              </Suspense>
            }
          />
          <Route
            path="/containeroverview"
            element={
              <Suspense fallback={<div>...Loading</div>}>
                <ContainerOverview />
              </Suspense>
            }
          />
          <Route
            path="/addcontainer"
            element={
              <Suspense fallback={<div>...Loading</div>}>
                <AddContainer />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
