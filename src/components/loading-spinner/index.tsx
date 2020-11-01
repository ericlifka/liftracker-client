import type {FunctionComponent} from "react"
import React from "react"
import "./style.less"

export const LoadingSpinner: FunctionComponent = () =>
  <div className="full-page-mask">
    <svg className="loading-spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
    </svg>
  </div>
