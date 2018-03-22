import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { googleMapKey } from '../secrets'
import { Markers } from './Markers'

export class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: {lat: 40.70, lng: -74.00},
      zoom: 14,
      bootstrapURLKeys: { key: googleMapKey }
      // options: {options},
    //   heatmapLibrary: true,
    //   // heatmap: {
    //   //   positions: [],
    //   //   options: {
    //   //     radius: 20,
    //   //     opacity: 0.7,
    //   //     gradient: [
    //   //       'rgba(0, 255, 255, 0)',
    //   //       'rgba(0, 255, 255, 1)',
    //   //       'rgba(0, 191, 255, 1)',
    //   //       'rgba(0, 127, 255, 1)',
    //   //       'rgba(0, 63, 255, 1)',
    //   //       'rgba(0, 0, 255, 1)',
    //   //       'rgba(0, 0, 223, 1)',
    //   //       'rgba(0, 0, 191, 1)',
    //   //       'rgba(0, 0, 159, 1)',
    //   //       'rgba(0, 0, 127, 1)',
    //   //       'rgba(63, 0, 91, 1)',
    //   //       'rgba(127, 0, 63, 1)',
    //   //       'rgba(191, 0, 31, 1)',
    //   //       'rgba(255, 0, 0, 1)'
    //   //     ]
    //   //   },
    //   // }
    }
  }

  render() {
    const style = {
      top: 0,
      bottom: 0,
      height: '80vh',
      width: '100vw'
    }
    return (
      <div id="map" style={style}>
        <GoogleMapReact
          bootstrapURLKeys={this.state.bootstrapURLKeys}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          heatmapLibrary={true}
          // heatmap={this.state.heatmap}
          // options={this.state.options}
        >
        {
          this.props.markers.length > 0 && this.props.markers.map(eachMarker=>(
              <Markers
                key={eachMarker.venue.id}
                lat={eachMarker.venue.location.lat}
                lng={eachMarker.venue.location.lng}
                establishmentName = {eachMarker.venue.name}
                establishmentId = {eachMarker.venue.id}
                name={'restaurant'}
              />
            )
          )
        }
          <Markers
            lat={40.705413}
            lng={-74.007844}
            name={'restaurant'}
          />
          <Markers
            lat={40.706413}
            lng={-74.008844}
            name={'knight'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

const mapState = state => ({ markers: state.markers })

export default connect(mapState)(Map)
