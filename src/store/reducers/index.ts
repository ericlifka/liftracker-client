import { combineReducers } from "redux"
import type { Action } from "redux"
import type {ThunkAction, ThunkDispatch} from "redux-thunk";
import { reducer as auth } from "./auth"
import { reducer as userLifts } from "./lift"


export const reducer = combineReducers({
  auth, userLifts
})

export type AppModel = ReturnType<typeof reducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppModel, unknown, Action<string>>
export type AppDispatch = ThunkDispatch<AppModel, unknown, Action<string>>
