import type { AppThunk } from "../reducers"
import type { History } from 'history';

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

export type LoginSuccess = { type: AuthActions.LOGIN_SUCCESS, token: string }
export const loginSuccess = (token: string): LoginSuccess => ({ type: AuthActions.LOGIN_SUCCESS, token })

export type RegisterRequest = { type: AuthActions.REGISTER_REQUEST }
export const registerRequest = (): RegisterRequest => ({ type: AuthActions.REGISTER_REQUEST })

export type RegisterFailure = { type: AuthActions.REGISTER_FAILURE, error: string }
export const registerFailure = (error: string): RegisterFailure => ({ type: AuthActions.REGISTER_FAILURE, error })

export type RegisterSuccess = { type: AuthActions.REGISTER_SUCCESS }
export const registerSuccess = (): RegisterSuccess => ({ type: AuthActions.REGISTER_SUCCESS })

export type AuthAction
  = Logout
  | LoginRequest
  | LoginFailure
  | LoginSuccess
  | RegisterRequest
  | RegisterFailure
  | RegisterSuccess

export const login = (history: History): AppThunk => (dispatch, getState) => {
  dispatch(loginRequest())
  setTimeout(() => {
    dispatch(loginSuccess('asdf'))
    history.push("/")
  }, 1000)
}

export const register = (history: History): AppThunk => (dispatch, getState) => {
  dispatch(registerRequest())
  setTimeout(() => {
    dispatch(registerSuccess())
    history.push('/login')
  }, 1000)
}
