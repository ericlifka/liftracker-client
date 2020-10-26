import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { logger } from "./middleware/logger"
import { reducer } from "./reducers"
import type { Model } from "./reducers";

export function configureAppStore(preloadedState?: Model) {
  const store = configureStore({
    reducer,
    middleware: [ logger, ...getDefaultMiddleware() ],
    preloadedState
  })

  if (import.meta.hot) {
    import.meta.hot.accept('./reducers', () => store.replaceReducer(reducer))
  }

  return store
}
