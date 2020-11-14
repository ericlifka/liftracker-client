import type {FunctionComponent} from "react"
import type {AppDispatch} from "../../store/reducers";
import React, {useEffect} from "react"
import {Content, NavBar, Page} from "../layout"
import {useDispatch, useSelector} from "react-redux";
import {getUserLiftsData, getUserLiftsError, getUserLiftsLoading} from "../../store/reducers/lift";
import {LoadingSpinner} from "../loading-spinner";
import {loadLifts} from "../../store/actions/lift";


export const LiftsRoute: FunctionComponent = () => {
  let dispatch = useDispatch<AppDispatch>()
  let lifts = useSelector(getUserLiftsData)
  let loading = useSelector(getUserLiftsLoading)
  let error = useSelector(getUserLiftsError)

  useEffect(() => {
    if (!lifts && !loading) {
      dispatch(loadLifts())
    }
  }, [lifts, loading])

  return (
    <Page>
      <NavBar title="Liftracker" hideBack />
      { loading ? <LoadingSpinner />
      : error ? <Content type="error">Couldn't load lifts, please refresh</Content>
      : <Content>
          [ {lifts && lifts.map( lift => JSON.stringify(lift) )} ]
        </Content>
      }
    </Page>
  )
}
