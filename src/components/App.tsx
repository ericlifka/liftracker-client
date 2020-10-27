import React, {FunctionComponent, ReactElement} from 'react'
import { useSelector } from "react-redux"
import {
  useHistory,
  BrowserRouter, Link, Route, Switch, Redirect
} from 'react-router-dom'
import { useDispatch } from "react-redux"
import {login, logout, register} from "../actions/auth"

import './App.css'
import type {AppDispatch} from "../reducers"
import {getAuthLoginPending, getAuthRegisterPending, getAuthToken} from "../reducers/auth"


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
        <Route path="/register">
          <RegisterPage />
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
    ? <div>
        <div>Welcome!</div>
        <button onClick={() => dispatch(logout())}>
          Sign out
        </button>
      </div>
    : <div>
        <div>You are not logged in.</div>
        <Link to="/login">login</Link>
      </div>
}

type RouteParams = { children: ReactElement[] | ReactElement, [s: string]: any }
function PrivateRoute(props: RouteParams) {
  let { children, ...rest } = props
  let loggedIn = !!useSelector(getAuthToken)

  return <Route { ...rest } render={
    ({ location }) =>
        loggedIn
          ? children
          : <Redirect to={{ pathname: "/login", state: { from: location }}} />
    } />
}

const HomePage: FunctionComponent = () => {
  return <h3>Home</h3>
}

const PublicPage: FunctionComponent = () => {
  return <h3>Public</h3>
}

const ProtectedPage: FunctionComponent = () => {
  return <h3>Protected</h3>
}

const LoginPage: FunctionComponent = () => {
  let history = useHistory()
  let dispatch = useDispatch<AppDispatch>()
  let loggingIn = useSelector(getAuthLoginPending)

  return (
    loggingIn
      ? <div>Logging In...</div>
      : <div>
          <button onClick={() => dispatch(login(history))}>login</button>
          <Link to="/register">register</Link>
        </div>
  )
}

const RegisterPage: FunctionComponent = () => {
  let history = useHistory()
  let dispatch = useDispatch<AppDispatch>()
  let registering = useSelector(getAuthRegisterPending)

  return registering
    ? <div>Registering...</div>
    : <div>
        <button onClick={() => dispatch(register(history))}>Register</button>
        <Link to="/login">Cancel</Link>
      </div>
}
