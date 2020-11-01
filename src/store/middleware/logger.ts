import type { Middleware } from 'redux'
import type { AppModel } from "../reducers"


export const logger: Middleware<{}, AppModel> = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}
