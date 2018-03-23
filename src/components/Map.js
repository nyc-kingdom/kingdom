import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { googleMapKey } from '../secrets'
import { blueWater, unsaturatedBrowns, greenTheme } from '../Assets/mapTheme'
import { Markers } from './index'


export class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: { lat: 40.70, lng: -74.00 },
      zoom: 14,
      bootstrapURLKeys: { key: googleMapKey },
      options: greenTheme,
      date: new Date(),
      check: false
    }
  }

  //commented out due to error - will revise
  // componentWillUpdate(newProps, oldProps) {
  //   if (this.state.check) {
  //     if (oldProps.date.getHours() <= 18 && oldProps.date.getHours() >= 6) {
  //       this.setState({ options: blueWater, check: !this.state.check })
  //     }
  //   } else {
  //     if (oldProps.date.getHours() > 18 || oldProps.date.getHours() < 6) {
  //       this.setState({ options: unsaturatedBrowns, check: !this.state.check })
  //     }
  //   }
  // }

  render() {
    console.log(this.state.date)
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

const mapState = state => {
  return {
    markers: state.markers,
    date: new Date()
  }
}

export default connect(mapState)(Map)
