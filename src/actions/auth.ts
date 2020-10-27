import type { AppAction } from "../reducers"

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

export type RegisterFailure = { type: AuthActions.REGISTER_FAILURE }
export const registerFailure = (): RegisterFailure => ({ type: AuthActions.REGISTER_FAILURE })

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

export const login = (): AppAction<Promise<void>> => (dispatch, getState) =>
  new Promise<void>((resolve, reject) => {
    dispatch(loginRequest())
    setTimeout(() => {
      dispatch(loginSuccess('asdf'))
      resolve()
    }, 1000)
  })
