import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import {
  useHistory, useLocation,
  BrowserRouter, Link, Route, Switch, Redirect
} from 'react-router-dom'
import { useDispatch } from "react-redux"
import {login, logout} from "../actions/auth"

import './App.css'
import type {AppDispatch} from "../reducers"
import {getAuthLoginPending, getAuthToken} from "../reducers/auth"


export const App = () =>
  <BrowserRouter>
    <div>
      <AuthButton />

      <ul>
        <li>
          <Link to="/">Home Page</Link>
        </li>
        <li>
          <Link to="/public">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Switch>
        <PrivateRoute path="/protected">
          <ProtectedPage />
        </PrivateRoute>

        <Route path="/public">
          <PublicPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </div>
  </BrowserRouter>

function AuthButton() {
  let dispatch = useDispatch()
  let loggedIn = !!useSelector(getAuthToken)

  return loggedIn
    ? <p>
        <div>Welcome!</div>
        <button onClick={() => dispatch(logout())}>
          Sign out
        </button>
      </p>
    : <p>You are not logged in.</p>
}

function PrivateRoute({ children, ...rest }) {
  let loggedIn = !!useSelector(getAuthToken)

  return <Route {...rest} render={
    ({ location }) =>
        loggedIn
          ? children
          : <Redirect to={{ pathname: "/login", state: { from: location }}} />
    } />
}

function HomePage() {
  return <h3>Home</h3>
}

function PublicPage() {
  return <h3>Public</h3>
}

function ProtectedPage() {
  return <h3>Protected</h3>
}

interface LocationState { from: { pathname: string } }
function LoginPage() {
  let history = useHistory()
  let location = useLocation<LocationState>()
  let dispatch = useDispatch<AppDispatch>()
  let loggingIn = useSelector(getAuthLoginPending)

  let from = location.state.from || { pathname: "/" }

  let click = () => {
    dispatch(login()).then(() => {
      history.replace(from)
    })
  }

  return (
    loggingIn
      ? <div>Logging In...</div>
      : <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={click}>Log in</button>
        </div>
  )
}
