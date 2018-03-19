import React from 'react'
import {connect} from 'react-redux'

const SinglePage = props => (
    <div>
        {'WELCOME TO ' + props.markers.find(eachMarker=>eachMarker.venue.id===props.match.params.id).venue.name + '\'s PAGE'}
    </div>
)

const mapProps = state => ({markers: state.markers})
export default connect(mapProps)(SinglePage)
