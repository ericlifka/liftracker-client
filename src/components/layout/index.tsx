import type {FunctionComponent} from "react"
import React from "react"
import "./style.less"

export const Page: FunctionComponent = (props) =>
  <div className="page-layout">{ props.children }</div>

export type ContentProps = {
  centered?: boolean
}
export const Content: FunctionComponent<ContentProps> = (props) => {
  let { centered, children } = props

  return (
    <div
      className={`page-content ${centered ? 'centered' : ''}`}
    >
      {children}
    </div>
  )
}


export type NavBarProps = {
  title: string
  hideBack?: boolean
}
export const NavBar:FunctionComponent<NavBarProps> = (props) => {
  let { hideBack, title } = props

  const navBack = () => null
  const chartClick = () => null
  const settingsClick = () => null

  return (
    <div className="page-nav-bar">
      {!hideBack &&
        <button className="navigation" onClick={navBack}>
          <i className="material-icons">arrow_back</i>
        </button>
      }
      <div className="title">{title}</div>
      <button className="navigation right" type="button" onClick={chartClick}>
        <i className="material-icons">show_chart</i>
      </button>
      <button className="navigation right" type="button" onClick={settingsClick}>
        <i className="material-icons">settings</i>
      </button>
    </div>
  )
}
