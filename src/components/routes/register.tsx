import type {FunctionComponent} from "react"
import type {AppDispatch} from "../../store/reducers"
import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getAuthRegisterError, getAuthRegisterPending} from "../../store/reducers/auth"
import {register} from "../../store/actions/auth"
import {LoadingSpinner} from "../loading-spinner"
import {Content, NavBar, Page} from "../layout"
import {FormActions, FormButton, FormCard, FormError, FormInput, FormLink} from "../form-card"

export const RegisterRoute: FunctionComponent = () => {
  let history = useHistory()
  let dispatch = useDispatch<AppDispatch>()
  let registering = useSelector(getAuthRegisterPending)
  let errorMessage = useSelector(getAuthRegisterError)
  let [ username, setUsername ] = useState("")
  let [ password, setPassword ] = useState("")
  let [ repeat, setRepeat ] = useState("")

  const submitForm = () => {
    dispatch(register(username, password, repeat, history))
  }

  return (
    <Page>
      <NavBar title="Register" />
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
          <FormInput
            type="password"
            label="repeat password"
            value={repeat}
            setValue={setRepeat}
          />
          <FormActions>
            <FormLink to="/login">cancel</FormLink>
            <FormButton type="submit">Register</FormButton>
          </FormActions>
        </FormCard>
      </Content>
      {registering && <LoadingSpinner />}
    </Page>
  )
}
