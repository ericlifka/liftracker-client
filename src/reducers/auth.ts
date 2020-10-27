import type { AuthAction } from "../actions/auth"
import type { AppModel } from "./index"
import { AuthActions } from "../actions/auth"

export type Auth = {
  token: null | string
  loginPending: boolean
  loginError: null | string
}

export const initialState = (): Auth => ({
  token: null,
  loginPending: false,
  loginError: null
})

export const getAuth = (state: AppModel) => state.auth
export const getAuthToken = (state: AppModel) => getAuth(state).token
export const getAuthLoginPending = (state: AppModel) => getAuth(state).loginPending
export const getAuthLoginError = (state: AppModel) => getAuth(state).loginError

export function reducer(state: Auth = initialState(), action: AuthAction): Auth {
  switch (action.type) {
    case AuthActions.LOGOUT:
      return { ...initialState() }

    case AuthActions.LOGIN_REQUEST:
      return {
        ...initialState(),
        loginPending: true
      }

    case AuthActions.LOGIN_FAILURE:
      return {
        ...initialState(),
        loginError: action.error
      }

    case AuthActions.LOGIN_SUCCESS:
      return {
        ...initialState(),
        token: action.token
      }

    case AuthActions.REGISTER_REQUEST:
      return state

    case AuthActions.REGISTER_FAILURE:
      return state

    case AuthActions.REGISTER_SUCCESS:
      return state

    default:
      return state
  }
}
