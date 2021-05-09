import { isAuth } from "../core/auth"
import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth() ? (
          isAuth().user.role === 1 ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        ) : (
          <Redirect
            to={{ pathname: "/sign-in", state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default AdminRoute
