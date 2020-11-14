import type { AppThunk } from "../reducers"
import type { Lift } from "../reducers/lift"
import { getAuthToken } from "../reducers/auth"

export enum LiftActions {
  LOAD_LIFTS_REQUEST = 'LOAD_LIFTS_REQUEST',
  LOAD_LIFTS_REQUEST_FAILURE = 'LOAD_LIFTS_REQUEST_FAILURE',
  LOAD_LIFTS_REQUEST_SUCCESS = 'LOAD_LIFTS_REQUEST_SUCCESS',
}

export type LoadLiftsRequest = { type: LiftActions.LOAD_LIFTS_REQUEST }
export const loadLiftsRequest = (): LoadLiftsRequest =>
  ({ type: LiftActions.LOAD_LIFTS_REQUEST })

export type LoadLiftsRequestFailure = { type: LiftActions.LOAD_LIFTS_REQUEST_FAILURE, error: string }
export const loadLiftsRequestFailure = (error: string): LoadLiftsRequestFailure =>
  ({ type: LiftActions.LOAD_LIFTS_REQUEST_FAILURE, error })

export type LoadLiftsRequestSuccess = { type: LiftActions.LOAD_LIFTS_REQUEST_SUCCESS, lifts: Lift[] }
export const loadLiftsRequestSuccess = (lifts: Lift[]): LoadLiftsRequestSuccess =>
  ({ type: LiftActions.LOAD_LIFTS_REQUEST_SUCCESS, lifts })


export type LiftAction
  = LoadLiftsRequest
  | LoadLiftsRequestFailure
  | LoadLiftsRequestSuccess


export const loadLifts = (): AppThunk =>
  async (dispatch, getState) => {
    dispatch(loadLiftsRequest())

    let response = await fetch('/api/lift', { headers: { 'Authorization': `Bearer ${getAuthToken(getState())}` }})
    let json = await response.json()

    if (response.status !== 200) {
      dispatch(loadLiftsRequestFailure(json.error))
    } else {
      dispatch(loadLiftsRequestSuccess(json.lifts))
    }
  }
