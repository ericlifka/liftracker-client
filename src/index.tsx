import React from 'react'
import { render } from 'react-dom'
import { Provider } from "react-redux"

import { App } from './components/App'
import { configureAppStore }  from "./configure-store"
import './index.css'

const store = configureAppStore()

function renderApp() {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <App/>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
}

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept('./components', renderApp)
}

renderApp()
