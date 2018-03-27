import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { googleMapKey } from '../secrets'
import { blueWater, unsaturatedBrowns, greenTheme, dark } from '../Assets/mapTheme'
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
    // if (this.state.check) {
    //   if (this.state.date.getHours() <= 18 && this.state.date.getHours() >= 6) {
    //     this.setState({ options: greenTheme, check: !this.state.check })
    //   }
    // } else {
    //   if (this.state.date.getHours() > 18 || this.state.date.getHours() < 6) {
    //     this.setState({ options: unsaturatedBrowns, check: !this.state.check })
    //   }
    // }
    if (!this.state.check) {
      if(this.state.date.getMinutes()>=0 && this.state.date.getMinutes()<20) this.setState({options: unsaturatedBrowns, check: !this.state.check  })
      if(this.state.date.getMinutes()>20 && this.state.date.getMinutes()<40) this.setState({options: dark, check: !this.state.check })
      if(this.state.date.getMinutes()>40 && this.state.date.getMinutes()<=59) this.setState({options: greenTheme, check: !this.state.check })
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
    console.log(this.props.trackLocation)
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
            this.props.establishments.length > 0 && this.props.establishments.map(eachMarker => (
              <Markers
                key={eachMarker.id}
                lat={eachMarker.latitude}
                lng={eachMarker.longitude}
                establishmentName={eachMarker.name}
                establishmentId={eachMarker.id}
                kingdom={eachMarker.kingdom}
                type="establishment"
              />
            )
            )
          }
          {this.props.markers.length > 0 && this.props.markers.map(eachMarker => (
            <Markers
            key={eachMarker.venue.id}
            lat={eachMarker.venue.location.lat}
            lng={eachMarker.venue.location.lng}
            establishmentName={eachMarker.venue.name}
            establishmentId={eachMarker.venue.id}
            type="searchResult"
            name={'restaurant'}
            />
          )
        )}
        </GoogleMapReact>
        </div>
      );
    }
  }

  const mapState = state => ({ markers: state.markers, establishments: state.establishments, trackLocation: state.trackLocation })

  export default connect(mapState)(Map)

  // {
  //   this.props.trackLocation &&
  //   <div>
  //   <Markers
  //     lat={this.props.trackLocation.coords[0]}
  //     lng={this.props.trackLocation.coords[1]}
  //     type="user"
  //     />
  //   </div>
  // }
