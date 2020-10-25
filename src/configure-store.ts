import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import { monitorReducerEnhancer } from "./enhancers/monitor-reducer"
import { logger } from "./middleware/logger"
import { reducer } from "./reducers"


export function configureStore(preloadedState?) {
  const middlewares = [ logger, thunk ]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [ middlewareEnhancer, monitorReducerEnhancer ]
  const composedEnhancers = composeWithDevTools(...enhancers)

  return createStore(reducer, preloadedState, composedEnhancers)
}
