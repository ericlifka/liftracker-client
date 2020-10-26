import type { Middleware } from 'redux'
import type { Model } from "../reducers"

export const logger: Middleware<{}, Model> = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}
