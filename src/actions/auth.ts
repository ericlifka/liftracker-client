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

export const login = (username: string, password: string, history: History): AppThunk =>
  async (dispatch, getState) => {
    dispatch(loginRequest())
    let response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    let json = await response.json()

    if (!response.ok) {
      return dispatch(loginFailure(json.error))
    }

    dispatch(loginSuccess(json.token, json.user))
    history.push('/protected')
  }

export const register = (username: string, password: string, history: History): AppThunk =>
  async (dispatch, getState) => {
    dispatch(registerRequest())
    let response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    let json = await response.json()

    if (!response.ok) {
      return dispatch(registerFailure(json.error))
    }

    dispatch(registerSuccess(json.user))
    history.push("/login")
  }
