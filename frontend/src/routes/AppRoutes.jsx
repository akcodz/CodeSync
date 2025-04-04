import React from "react";
import "../index.css"
import { Routes, Route } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import Home from "../pages/Home";
import Signup from "../pages/SignUp";
import Login from "../pages/Login";
import Projects from "../pages/Projects";
import PrivateRoute from "./PrivateRoutes";
import Project from "../pages/Project";
import CodeReview from "../pages/CodeReview"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/code-review" element={<CodeReview/>} />
      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects/:projectid"
        element={
          <PrivateRoute>
            <Project />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
