import {applyMiddleware, createStore, StoreEnhancer} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import { monitorReducerEnhancer } from "./enhancers/monitor-reducer"
import { logger } from "./middleware/logger"
import { reducer } from "./reducers"
import type { Model } from "./models";


export function configureStore(preloadedState?: Model) {
  const middlewares = [ logger, thunk ]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [ middlewareEnhancer, monitorReducerEnhancer ]
  // @ts-ignore this was taken from redux docs, I can't figure out the type signature to make this happy and I don't want ot put that kind of effort into this side project, so fuck it all with ignore statements...
  const composedEnhancers = composeWithDevTools(...enhancers)

  return createStore(reducer, preloadedState, composedEnhancers)
}
