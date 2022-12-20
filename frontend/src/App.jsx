import React, { lazy, Suspense, useEffect, useReducer, useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Introduction = lazy(() => import("./components/Pages/Introduction"));
const Login = lazy(() => import("./components/Pages/Login"));
const Landing = lazy(() => import("./components/Pages/Landing"));
const Map = lazy(() => import("./components/Pages/Map"));
const Register = lazy(() => import("./components/Pages/Register"));
const Mypage = lazy(() => import("./components/Pages/Mypage"));

import StorePage from "./components/Map/StorePage";
import "./App.css";
import { ErrorBoundary } from "react-error-boundary";
import UiErrorFallback from "./components/Common/UiErrorFallback";

import LayOut from "./components/Common/LayOut";
import * as Api from "./utils/Api";
import { loginReducer } from "./utils/reducer";
import KakaoAuth from "./components/User/KakaoAuth";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

const mapPathToComponent = {
  introduction: () => <Introduction />,
  login: () => <Login />,
  "/": () => <Landing />,
  map: () => <Map />,
  mypage: () => <Mypage />,
  register: () => <Register />,
  storepage: () => <StorePage />,
};

const setRoute = () => {
  return Object.keys(mapPathToComponent).map((path) => (
    <Route key={path} path={path} element={mapPathToComponent[path]()} />
  ));
};

function App() {

  //useReducer(첫 번째 파라미터에는 리듀서 함수, 두 번째 파라미터에는 리듀서의 기본 값을 넣는다.)
  //useReducer를 사용하면 state값과 dispatch 함수를 받아온다. 여기서 state는 현재 가리키고 있는 상태 / dispatch는 액션을 '발생시키는' 함수. 
  //dispatch(action: 어떤 값도 가능)과 같은 형태로 함수 안에 파라미터로 액션 값을 넣어주면 리듀서 함수가 호출.

  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  // useEffect(() => {
  //   console.log(userState);
  // }, [userState])

  const fetchCurrentUser = async() => {
    try {
      const res = await Api.get("user");
      const currentUser = res.data;
      console.log(currentUser);

      dispatch({
        type: "LOGIN",
        payload: currentUser,
      });
    }
    catch (err) {
      console.log(err.message);
    }
    // fetch 과정이 끝났으므로
    setIsFetchCompleted(true);
  }

  // 이 다음에!!! useEffect 사용!!!
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading..."
  }

  return (
    <>
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
      <ErrorBoundary FallbackComponent={UiErrorFallback}>
        <Suspense
          fallback={<div style={{ fontSize: "12px", textAlign: 'center'}}>Loading...</div>}
        >
            <Router>
              <LayOut>
                <Routes>
                  { setRoute() }
                  <Route path="login/oauth2/code/kakao" element={<KakaoAuth />} />
                </Routes>
              </LayOut>
            </Router>
        </Suspense>
      </ErrorBoundary>
      </UserStateContext.Provider>
      </DispatchContext.Provider>
    </>
  );
}

export default App;
