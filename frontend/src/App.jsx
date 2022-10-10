import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// const _sleep = async () =>
//   await new Promise((resolve) => setTimeout(() => resolve(), 3000));

// import Introduction from "./components/Pages/Introduction";
const Introduction = lazy(() => import("./components/Pages/Introduction"));
// import Login from "./components/Pages/Login";
const Login = lazy(() => import("./components/Pages/Login"));

import Landing from "./components/Pages/Landing";
import Map from "./components/Pages/Map";
// 실험코드
import Mypage from "./components/Pages/Mypage";
// 실험코드
import Register from "./components/Pages/Register";

import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import UiErrorFallback from "./components/UiErrorFallback";
import Layout from "./components/common/Layout";

function App() {
  return (
    <>
      <ErrorBoundary FallbackComponent={UiErrorFallback}>
        <Suspense
          fallback={<div style={{ fontSize: "100px" }}>loading....</div>}
        >
          <Layout>
            <Router>
              <Routes>
                <Route path="introduction" element={<Introduction />} />
                <Route path="login" element={<Login />} />
                <Route path="/" element={<Landing />} />
                <Route path="map" element={<Map />} />
                {/* 실험코드 */}
                <Route path="mypage" element={<Mypage />} />
                {/* 실험코드 */}
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