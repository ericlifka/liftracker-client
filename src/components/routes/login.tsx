import type {AppDispatch} from "../../store/reducers"
import React, {FunctionComponent, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getAuthLoginError, getAuthLoginPending} from "../../store/reducers/auth"
import {login, loginFailure} from "../../store/actions/auth"
import {Content, NavBar, Page} from "../layout"
import {LoadingSpinner} from "../loading-spinner"
import {FormActions, FormButton, FormCard, FormError, FormInput, FormLink} from "../form-card"


export const LoginRoute: FunctionComponent = () => {
  let history = useHistory()
  let dispatch = useDispatch<AppDispatch>()
  let loggingIn = useSelector(getAuthLoginPending)
  let errorMessage = useSelector(getAuthLoginError)
  let [ username, setUsername ] = useState("")
  let [ password, setPassword ] = useState("")

  const submitForm = () => {
    if (!username || !password) {
      dispatch(loginFailure('All fields required'))
    }
    else {
      dispatch(login(username, password, history))
    }
  }

  return (
    <Page>
      <NavBar title="Login" hideBack />
      <Content centered>
        <FormCard onSubmit={submitForm}>
          <FormError>{errorMessage}</FormError>
          <FormInput
            label="username"
            placeholder="user@email.com"
            value={username}
            setValue={setUsername}
          />
          <FormInput
            type="password"
            label="password"
            value={password}
            setValue={setPassword}
          />
          <FormActions>
            <FormLink to="/register">register</FormLink>
            <FormButton type="submit">login</FormButton>
          </FormActions>
        </FormCard>
      </Content>
      {loggingIn && <LoadingSpinner />}
    </Page>
  )
}
