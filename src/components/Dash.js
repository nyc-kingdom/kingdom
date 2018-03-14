import React from 'react'
import { connect } from 'react-redux'
import { createMarker } from '../store';
// import mapboxgl from 'mapbox-gl'
// import { Map } from './index';

export const Dash = (props) => {
    return (
        <div id="Dash">
            <button onClick={() => { props.createMarker('dummy Marker') }} >Hello</button>
        </div>
    )
}

const mapProps = null
const mapDispatch = dispatch => ({ createMarker: marker => dispatch(createMarker(marker)) })

export default connect(mapProps, mapDispatch)(Dash)
