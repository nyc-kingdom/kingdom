import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { googleMapKey } from '../secrets'

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const key = googleMapKey;

export class Map extends Component {

  static defaultProps = {
    center: { lat: 59.95, lng: 30.33 },
    zoom: 11
  };

  render() {
    const style = {
      top: 0,
      bottom: 0,
      height: '100vh',
      width: '100vw'
    }
    return (
      <div id="map" style={style}>
        <GoogleMapReact
          bootstrapURLKeys={{ key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

const mapState = null

export default connect(mapState)(Map)
