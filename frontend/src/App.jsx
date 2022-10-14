import React, { lazy, Suspense, useReducer, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import * as Api from "./utils/Api";

// export const UserStateContext = createContext(null);
// export const DispatchContext = createContext(null);

function App() {

  //useReducer(첫 번째 파라미터에는 리듀서 함수, 두 번째 파라미터에는 리듀서의 기본 값을 넣는다.)
  //useReducer를 사용하면 state값과 dispatch 함수를 받아온다. 여기서 state는 현재 가리키고 있는 상태 / dispatch는 액션을 '발생시키는' 함수. 
  //dispatch(action: 어떤 값도 가능)과 같은 형태로 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출.

  // const [userState, dispatch] = useReducer(loginReducer, {
  //   user: null,
  // });

  // const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  // const fetchCurrentUser = async() => {
  //   try {
  //     //흠.... get 부분이 아직 없어서 이거 구현이 안 되겠는데.

  //   }
  // }

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