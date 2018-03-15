import React, { Component } from 'react'
import { connect } from 'react-redux'
import mapboxgl from 'mapbox-gl'

// import { createMarker } from '../store'

mapboxgl.accessToken = TBD;

export class Map extends Component {
    componentDidMount() {
        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            center: [-74.009, 40.705],
            zoom: 11,
            style: 'mapbox://styles/mapbox/streets-v9'
        })
    }

    componentWillUnmount() {
        this.map.remove()
    }


    render() {
        const marker = this.props.markers && this.props.markers.length ?
        this.props.markers.forEach(eachMarker => { new mapboxgl.Marker().setLngLat([-74.009, 40.705]).addTo(this.map) })

        : null
        const style = {
            top: 0,
            bottom: 0,
            height: '100vh',
            width: '100vw'
        };

        return (
            <div id='Map' style={style} ref={el => this.mapContainer = el} />
        )
    }
}

const mapProps = state => ({ markers: state.markers })

export default connect(mapProps)(Map)
