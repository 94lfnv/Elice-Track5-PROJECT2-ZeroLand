import React, { useContext } from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { DispatchContext, UserStateContext } from "../../App";


function Header () {
    const navigate = useNavigate();

    //useLocation <- 현재 url 정보를 가져오는 함수
    const location = useLocation();
    // console.log(location);

    const userState = useContext(UserStateContext);
    const dispatch = useContext(DispatchContext);

    const isLogin = !!userState.user;

    // 로그아웃은 type을 바꿔 주면 됨
    const isLogout = () => {
        sessionStorage.removeItem("userToken");
        dispatch({ type: "LOGOUT" });
        navigate("/");
    } 

  return (
        <Navbar expand="lg">
            <Container className="my-2" id="my-nav-container">
                <Navbar.Brand className="my-2" id="logo" href="/">
                    <img src="/img/zeroland_logo.png" />
                </Navbar.Brand>
                <Nav.Item id="my-nav-item" className="ms-auto">
                    <Nav.Link href="/introduction">Introduction</Nav.Link>
                </Nav.Item>
                <Nav.Item id="my-nav-item" className="ms-4">
                    <Nav.Link href="/map">Map</Nav.Link>
                </Nav.Item>
                <div className="justify-content-end ms-3">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav activeKey={location.pathname} className="ms-auto">
                        {!isLogin && (<Nav.Item id="my-nav-item" className="mx-1 px-1">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav.Item>)}
                        {!isLogin && (<Nav.Item id="my-nav-item" className="mx-1 px-1">
                            <Nav.Link href="/register">Sign In</Nav.Link>
                        </Nav.Item>)}
                        {isLogin && (<Nav.Item id="my-nav-item" className="mx-1 px-1">
                         <Nav.Link href="/mypage">Mypage</Nav.Link>
                         </Nav.Item>)}
                        {isLogin && (<Nav.Item id="my-nav-item" className="mx-1 px-1">
                            <Nav.Link href="/" onClick={isLogout}>Log out</Nav.Link>
                        </Nav.Item>)}
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
  );
}

export default Header;