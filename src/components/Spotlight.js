import React from 'react'
import {connect} from 'react-redux'

const Spotlight = props => <div>{props.markers.find(eachMarker=>eachMarker.venue.id===props.match.params.id).venue.name}</div>

const mapProps = state => ({markers: state.markers})

export default connect(mapProps)(Spotlight)