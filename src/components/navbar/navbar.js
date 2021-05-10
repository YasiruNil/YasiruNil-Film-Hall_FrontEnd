import "./navbar.css";
import { compose } from "redux";
import { connect } from "react-redux";
import { isAuth } from "../core/auth";
import { userSignOut } from "../../actions/userAction";
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "black", border: 0 };
  } else {
    return { color: "#ff3366", border: 0 };
  }
};
const NavBar = (props) => {
  const [run, setRun] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (props.signOutData === "") {
      setRun(false);
    } else {
      setRun(true);
    }
  }, [props.signOutData]);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setShow(true);
      } else setShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav__white"}`}>
      <img src={"img/cinema.jpg"} className='nav__logo' />
      <ul className='navbar__list'>
        <li>
          <Link
            className='navbar__list-item'
            to='/'
            style={isActive(props.history, "/")}>
            Home
          </Link>
        </li>
        {isAuth() && isAuth().user.role === 0 && (
          <li>
            <Link
              className='navbar__list-item'
              to='/dashboard'
              style={isActive(props.history, "/dashboard")}>
              DashBoard
            </Link>
          </li>
        )}
        {isAuth() && isAuth().user.role === 1 && (
          <>
            <li>
              <Link
                className='navbar__list-item'
                to='/admin/dashboard'
                style={isActive(props.history, "/admin/dashboard")}>
                DashBoard
              </Link>
            </li>
          </>
        )}
        {!isAuth() && (
          <>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/sign-in'
                style={isActive(props.history, "/sign-in")}>
                SignIn
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/sign-up'
                style={isActive(props.history, "/sign-up")}>
                SignUp
              </Link>
            </li>
          </>
        )}
        {isAuth() && (
          <>
            <li>
              <Link
                className='nav-link'
                to='/'
                style={{ cursor: "pointer", color: "#ff3366", border: 0 }}
                onClick={() => props.userSignOut()}>
                Sign Out
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  signOutData: user.signOutData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    userSignOut: (data) => dispatch(userSignOut(data)),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(NavBar);
