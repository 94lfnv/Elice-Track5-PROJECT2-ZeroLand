import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const _sleep = async () =>
//   await new Promise((resolve) => setTimeout(() => resolve(), 3000));

// import Introduction from "./components/Pages/Introduction";
// import Login from "./components/Pages/Login";
// import Landing from "./components/Pages/Landing";
// import Map from "./components/Pages/Map";
// import Register from "./components/Pages/Register";

const Introduction = lazy(() => import("./components/Pages/Introduction"));
const Login = lazy(() => import("./components/Pages/Login"));
const Landing = lazy(() => import("./components/Pages/Landing"));
const Map = lazy(() => import("./components/Pages/Map"));
const Register = lazy(() => import("./components/Pages/Register"));
const Mypage = lazy(() => import("./components/Pages/Mypage"));

import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import UiErrorFallback from "./components/Common/UiErrorFallback";
import Layout from "./components/common/Layout";

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={UiErrorFallback}>
        <Suspense
          fallback={<div style={{ fontSize: "12px", textAlign: 'center'}}>Loading...</div>}
        >
          <Layout>
            <Router>
              <Routes>
                <Route path="introduction" element={<Introduction />} />
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Landing />} />
                <Route path="map" element={<Map />} />
                <Route path="mypage" element={<Mypage />} />
                <Route path="register" element={<Register />} />
              </Routes>
            </Router>
          </Layout>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;