import type {AppDispatch} from "../../../reducers"
import React, {FunctionComponent, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getAuthLoginPending} from "../../../reducers/auth"
import {login} from "../../../actions/auth"


export const LoginRoute: FunctionComponent = () => {
  let history = useHistory()
  let dispatch = useDispatch<AppDispatch>()
  let loggingIn = useSelector(getAuthLoginPending)
  let [ username, setUsername ] = useState("")
  let [ password, setPassword ] = useState("")

  return (
    loggingIn
      ? <div>Logging In...</div>
      : <div>
        <div><input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" /></div>
        <div><input value={password} onChange={e => setPassword(e.target.value)} placeholder="username" /></div>
        <button onClick={() => dispatch(login(username, password, history))}>login</button>
        <Link to="/register">register</Link>
      </div>
  )
}
