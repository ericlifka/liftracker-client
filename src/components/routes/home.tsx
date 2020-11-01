import type {FunctionComponent} from "react"
import type {AppDispatch} from "../../store/reducers"
import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Redirect, useHistory} from "react-router-dom"
import {getAuthToken} from "../../store/reducers/auth"
import {restoreAuth} from "../../store/actions/auth"
import {NavBar, Page} from "../layout"
import {LoadingSpinner} from "../loading-spinner"


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
    : !cachedToken
      ? <Redirect push to="/login" />
      : <Page>
          <NavBar title="Liftracker" hideBack />
          <LoadingSpinner />
        </Page>
}
