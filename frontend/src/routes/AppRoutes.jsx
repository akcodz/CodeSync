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
import Problems from "../pages/Problems";
import Problem from "../pages/Problem";

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
        <Route
        path="/problems"
        element={
          <PrivateRoute>
            <Problems />
          </PrivateRoute>
        }
      />
        <Route
        path="/problem/:id"
        element={
          <PrivateRoute>
            <Problem />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
