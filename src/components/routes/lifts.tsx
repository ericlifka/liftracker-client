import type {FunctionComponent} from "react"
import React from "react"
import {Content, NavBar, Page} from "../layout"


export const LiftsRoute: FunctionComponent = () => {
  return (
    <Page>
      <NavBar title="Liftracker" hideBack />
      <Content>Your Lifts go here</Content>
    </Page>
  )
}
