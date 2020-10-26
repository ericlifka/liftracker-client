import type {AuthAction} from "../actions/auth"
import {AuthActions} from "../actions/auth"

export type Auth = { }

export const initialState = (): Auth => ({})

export function reducer(state: Auth = initialState(), action: AuthAction): Auth {
  switch (action.type) {
    case AuthActions.LOGIN_REQUEST:
      return state

    case AuthActions.LOGIN_FAILURE:
      return state

    case AuthActions.LOGIN_SUCCESS:
      return state

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
