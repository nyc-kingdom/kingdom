import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { googleMapKey } from '../secrets'
import { blueWater, unsaturatedBrowns, greenTheme } from '../Assets/mapTheme'
import { Markers } from './'


export class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: { lat: 40.70, lng: -74.00 },
      zoom: 13,
      bootstrapURLKeys: { key: googleMapKey },
      options: greenTheme,
      date: new Date(),
      check: false
    }
    this.updateMapTheme = this.updateMapTheme.bind(this)
  }

  updateMapTheme() {
    if (this.state.check) {
      if (this.state.date.getHours() <= 18 && this.state.date.getHours() >= 6) {
        this.setState({ options: greenTheme, check: !this.state.check })
      }
    } else {
      if (this.state.date.getHours() > 18 || this.state.date.getHours() < 6) {
        this.setState({ options: unsaturatedBrowns, check: !this.state.check })
      }
    }
  }

  render() {
    this.updateMapTheme()
    const style = {
      top: 0,
      bottom: 0,
      height: '100vh',
      width: '100vw'
    }
    return (
      <div id="map" style={style}>
        <GoogleMapReact
          bootstrapURLKeys={this.state.bootstrapURLKeys}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
          heatmapLibrary={true}
          defaultAverageCenter={true}
          // heatmap={this.state.heatmap}
          options={this.state.options}
        >
          {
            this.props.markers.length > 0 && this.props.markers.map(eachMarker => (
              <Markers
                key={eachMarker.venue.id}
                lat={eachMarker.venue.location.lat}
                lng={eachMarker.venue.location.lng}
                establishmentName={eachMarker.venue.name}
                establishmentId={eachMarker.venue.id}
                name={'restaurant'}
              />
            )
            )
          }

          {
            this.props.establishments.length > 0 && this.props.establishments.map(eachMarker => (
              <Markers
                key={eachMarker.id}
                lat={eachMarker.latitude}
                lng={eachMarker.longitude}
                establishmentName={eachMarker.name}
                establishmentId={eachMarker.id}
                name={'castle'}
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

const mapState = state => ({ markers: state.markers, establishments: state.establishments })

export default connect(mapState)(Map)
