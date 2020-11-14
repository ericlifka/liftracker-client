import type {LiftAction} from "../actions/lift";
import type {AppModel} from "./index";
import {LiftActions} from "../actions/lift";


export type Lift = {
  id: string
  name: string
  max: number
  increment: number
}

export type UserLifts = {
  lifts: null | Lift[]
  liftsLoading: boolean
  liftsError: null | string
}

export const initialState = (): UserLifts => ({
  lifts: null,
  liftsLoading: false,
  liftsError: null
})

export const getUserLifts = (state: AppModel) => state.userLifts
export const getUserLiftsData = (state: AppModel) => getUserLifts(state).lifts
export const getUserLiftsLoading = (state: AppModel) => getUserLifts(state).liftsLoading
export const getUserLiftsError = (state: AppModel) => getUserLifts(state).liftsError

export function reducer(state: UserLifts = initialState(), action: LiftAction): UserLifts {
  switch (action.type) {
    case LiftActions.LOAD_LIFTS_REQUEST:
      return { ...initialState(), liftsLoading: true }

    case LiftActions.LOAD_LIFTS_REQUEST_FAILURE:
      return { ...initialState(), liftsError: action.error }

    case LiftActions.LOAD_LIFTS_REQUEST_SUCCESS:
      return { ...initialState(), lifts: [ ...action.lifts ] }

    default:
      return state
  }
}
