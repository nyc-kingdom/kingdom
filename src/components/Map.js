import React, { Component } from 'react'
import { connect } from 'react-redux'
// import mapboxgl from 'mapbox-gl'
import GoogleMapReact from 'google-map-react'

// import { createMarker } from '../store'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

// mapboxgl.accessToken = TBD;
const key = process.env.REACT_APP_GOOGLE_MAPS_KEY || process.env.GOOGLE_MAPS_KEY

export class Map extends Component {
    // componentDidMount() {
    //     this.initMap = 
    // }
    static defaultProps = {
      center: {lat: 59.95, lng: 30.33},
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
          bootstrapURLKeys={ key }
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

// export class Map extends Component {
//     componentDidMount() {
//         this.map = new mapboxgl.Map({
//             container: this.mapContainer,
//             center: [-74.009, 40.705],
//             zoom: 11,
//             style: 'mapbox://styles/mapbox/streets-v9'
//         })
//     }

//     componentWillUnmount() {
//         this.map.remove()
//     }


//     render() {
//         const marker = this.props.markers && this.props.markers.length ?
//         this.props.markers.forEach(eachMarker => { new mapboxgl.Marker().setLngLat([-74.009, 40.705]).addTo(this.map) })

//         : null
//         const style = {
//             top: 0,
//             bottom: 0,
//             height: '100vh',
//             width: '100vw'
//         };

//         return (
//             <div id='Map' style={style} ref={el => this.mapContainer = el} />
//         )
//     }
// }

const mapState = null
// state => ({ markers: state.markers })

export default connect(mapState)(Map)
