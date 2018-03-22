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
    }
  }

  render() {
    const style = {
      top: 0,
      bottom: 0,
      height: '70vh',
      width: '100vh'
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
