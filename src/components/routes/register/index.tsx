import type {FunctionComponent} from "react"
import type {AppDispatch} from "../../../reducers";

import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAuthRegisterPending} from "../../../reducers/auth";
import {register} from "../../../actions/auth";

export const RegisterRoute: FunctionComponent = () => {
  let history = useHistory()
  let dispatch = useDispatch<AppDispatch>()
  let registering = useSelector(getAuthRegisterPending)
  let [ username, setUsername ] = useState("")
  let [ password, setPassword ] = useState("")

  return registering
    ? <div>Registering...</div>
    : <div>
      <div><input value={username} onChange={e => setUsername(e.target.value)} placeholder="username" /></div>
      <div><input value={password} onChange={e => setPassword(e.target.value)} placeholder="username" /></div>
      <button onClick={() => dispatch(register(username, password, history))}>Register</button>
      <Link to="/login">Cancel</Link>
    </div>
}
