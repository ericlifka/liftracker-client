import type { AppThunk } from "../reducers"
import type { History } from 'history'
import type { User } from "../reducers/auth"

export enum AuthActions {
  LOGOUT = 'LOGOUT',
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_FAILURE = 'REGISTER_FAILURE',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS'
}

export type Logout = { type: AuthActions.LOGOUT }
export const logout = (): Logout => ({ type: AuthActions.LOGOUT })

export type LoginRequest = { type: AuthActions.LOGIN_REQUEST }
export const loginRequest = (): LoginRequest => ({ type: AuthActions.LOGIN_REQUEST })

export type LoginFailure = { type: AuthActions.LOGIN_FAILURE, error: string }
export const loginFailure = (error: string): LoginFailure => ({ type: AuthActions.LOGIN_FAILURE, error })

export type LoginSuccess = { type: AuthActions.LOGIN_SUCCESS, token: string, user: User }
export const loginSuccess = (token: string, user: User): LoginSuccess => ({ type: AuthActions.LOGIN_SUCCESS, token, user })

export type RegisterRequest = { type: AuthActions.REGISTER_REQUEST }
export const registerRequest = (): RegisterRequest => ({ type: AuthActions.REGISTER_REQUEST })

export type RegisterFailure = { type: AuthActions.REGISTER_FAILURE, error: string }
export const registerFailure = (error: string): RegisterFailure => ({ type: AuthActions.REGISTER_FAILURE, error })

export type RegisterSuccess = { type: AuthActions.REGISTER_SUCCESS, user: User }
export const registerSuccess = (user: User): RegisterSuccess => ({ type: AuthActions.REGISTER_SUCCESS, user })

export type AuthAction
  = Logout
  | LoginRequest
  | LoginFailure
  | LoginSuccess
  | RegisterRequest
  | RegisterFailure
  | RegisterSuccess

const authRequestPayload = (username:string, password:string) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
})

export const login = (username: string, password: string, history: History): AppThunk =>
  async (dispatch, getState) => {
    if (!username || !password) {
      return dispatch(loginFailure('All fields required'))
    }

    dispatch(loginRequest())
    let response = await fetch('/api/login', authRequestPayload(username, password))
    let json = await response.json()

    if (!response.ok) {
      dispatch(loginFailure(json.error))
    }
    else {
      dispatch(loginSuccess(json.token, json.user))
      localStorage.setItem('token', json.token)
      history.push('/')
    }
  }

export const register = (username: string, password: string, repeat: string, history: History): AppThunk =>
  async (dispatch, getState) => {
    if (!username || !password || !repeat) {
      return dispatch(registerFailure('All fields required'))
    }
    else if (password !== repeat) {
      return dispatch(registerFailure("Passwords don't match"))
    }

    dispatch(registerRequest())
    let response = await fetch('/api/register', authRequestPayload(username, password))
    let json = await response.json()

    if (!response.ok) {
      dispatch(registerFailure(json.error))
    }
    else {
      dispatch(registerSuccess(json.user))
      history.push("/login")
    }
  }

export const restoreAuth = (token: string, history: History): AppThunk =>
  async (dispatch, getState) => {
    let response = await fetch('/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (response.status !== 200) {
      history.push("/login")
    }
    else {
      let json = await response.json()
      dispatch(loginSuccess(token, json.user))
    }
  }
