import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {LoginRoute} from "./routes/login"
import {RegisterRoute} from "./routes/register"
import {HomeRoute} from "./routes/home"
import {LiftsRoute} from "./routes/lifts"
import {PrivateRoute} from "./routes/private-route"


export const App = () =>
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/lifts">
        <LiftsRoute />
      </PrivateRoute>

      <Route path="/login">
        <LoginRoute />
      </Route>
      <Route path="/register">
        <RegisterRoute />
      </Route>

      <Route path="/">
        <HomeRoute />
      </Route>
    </Switch>
  </BrowserRouter>
