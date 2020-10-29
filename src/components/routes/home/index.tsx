import type {FunctionComponent} from "react"
import type {AppDispatch} from "../../../reducers"
import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Redirect, useHistory} from "react-router-dom"
import {getAuthToken} from "../../../reducers/auth"
import {restoreAuth} from "../../../actions/auth"


export const HomeRoute: FunctionComponent = () => {
  let history = useHistory()
  let dispatch = useDispatch<AppDispatch>()
  let loggedIn = !!useSelector(getAuthToken)
  let cachedToken = localStorage.getItem('token')

  useEffect(() => {
    if (!loggedIn && cachedToken) {
      dispatch(restoreAuth(cachedToken, history))
    }
  }, [loggedIn, cachedToken])

  return loggedIn
    ? <Redirect push to="/lifts" />
    : cachedToken
      ? <div>Loading...</div>
      : <Redirect push to="/login" />
}
