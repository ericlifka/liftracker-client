import { combineReducers } from "redux"
import { reducer as auth } from "./auth"

export const reducer = combineReducers({
  auth
})

export type Model = ReturnType<typeof reducer>
