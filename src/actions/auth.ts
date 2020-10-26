
export enum AuthActions {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_FAILURE = 'LOGIN_FAILURE',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  REGISTER_REQUEST = 'REGISTER_REQUEST',
  REGISTER_FAILURE = 'REGISTER_FAILURE',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS'
}

export type LoginRequest = { type: AuthActions.LOGIN_REQUEST }
export const loginRequest = (): LoginRequest => ({ type: AuthActions.LOGIN_REQUEST })

export type LoginFailure = { type: AuthActions.LOGIN_FAILURE }
export const loginFailure = (): LoginFailure => ({ type: AuthActions.LOGIN_FAILURE })

export type LoginSuccess = { type: AuthActions.LOGIN_SUCCESS }
export const loginSuccess = (): LoginSuccess => ({ type: AuthActions.LOGIN_SUCCESS })

export type RegisterRequest = { type: AuthActions.REGISTER_REQUEST }
export const registerRequest = (): RegisterRequest => ({ type: AuthActions.REGISTER_REQUEST })

export type RegisterFailure = { type: AuthActions.REGISTER_FAILURE }
export const registerFailure = (): RegisterFailure => ({ type: AuthActions.REGISTER_FAILURE })

export type RegisterSuccess = { type: AuthActions.REGISTER_SUCCESS }
export const registerSuccess = (): RegisterSuccess => ({ type: AuthActions.REGISTER_SUCCESS })

export type AuthAction
  = LoginRequest
  | LoginFailure
  | LoginSuccess
  | RegisterRequest
  | RegisterFailure
  | RegisterSuccess
