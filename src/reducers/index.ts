import { combineReducers } from "redux"
import type { Action as ReduxAction } from "redux"
import type {ThunkAction, ThunkDispatch} from "redux-thunk";
import { reducer as auth } from "./auth"

export const reducer = combineReducers({
  auth
})

export type AppModel = ReturnType<typeof reducer>
export type AppAction<R> = ThunkAction<R, AppModel, undefined, ReduxAction>
export type AppDispatch = ThunkDispatch<AppModel, undefined, ReduxAction>
