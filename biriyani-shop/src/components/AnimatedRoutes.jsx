

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Login from "../components/Login";
import Signup from "../components/Signup";
import AdminLogin from "../components/AdminLogin";

import Home from "../components/Home";
import Menu from "../components/Menu";
import Cart from "../components/Cart";
import Contact from "../components/Contact";
import Starters from "../components/Starters";
import CoolDrinks from "../components/CoolDrinks";
import Admin from "../components/Admin";
import PublicRoute from "./PublicRoute";
import ProtectedUser from "./ProtectedUser";
import ProtectedAdmin from "./ProtectedAdmin";

const pageAnim = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Page = ({ children }) => (
  <motion.div
    variants={pageAnim}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* PUBLIC */}
        <Route
  path="/login"
  element={
    <PublicRoute>
      <Page><Login /></Page>
    </PublicRoute>
  }
/>

<Route
  path="/signup"
  element={
    <PublicRoute>
      <Page><Signup /></Page>
    </PublicRoute>
  }
/>



        <Route path="/adminlogin" element={<Page><AdminLogin /></Page>} />

        {/* USER */}
        <Route
          path="/home"
          element={
            <ProtectedUser>
              <Page><Home /></Page>
            </ProtectedUser>
          }
        />

        <Route
          path="/biriyani"
          element={
            <ProtectedUser>
              <Page><Menu /></Page>
            </ProtectedUser>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedUser>
              <Page><Cart /></Page>
            </ProtectedUser>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedUser>
              <Page><Contact /></Page>
            </ProtectedUser>
          }
        />

        <Route
          path="/starters"
          element={
            <ProtectedUser>
              <Page><Starters /></Page>
            </ProtectedUser>
          }
        />

        <Route
          path="/cooldrinks"
          element={
            <ProtectedUser>
              <Page><CoolDrinks /></Page>
            </ProtectedUser>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <Page><Admin /></Page>
            </ProtectedAdmin>
          }
        />

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
