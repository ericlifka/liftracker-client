import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {getAuthToken} from "../../store/reducers/auth";


type RouteParams = { children: ReactElement[] | ReactElement, [s: string]: any }

export const PrivateRoute = (props: RouteParams) => {
  let { children, ...rest } = props
  let loggedIn = !!useSelector(getAuthToken)

  return (
    <Route { ...rest }
      render={() =>
        loggedIn
          ? children
          : <Redirect push to={{ pathname: "/" }} />
      } />
  )
}
