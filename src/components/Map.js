import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { blueWater, unsaturatedBrowns, greenTheme, dark, midnight, autumnWorld } from '../Assets/mapTheme'
import { Markers } from './'
import {setMapStatus} from '../store/mapStatus'



export class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: { lat: 40.70, lng: -74.00 },
      zoom: 13,
      bootstrapURLKeys: { key: "AIzaSyBqFElyKsNAtWKnM4pnj9CqCRc6u5ruxd4" },
      options: greenTheme,
      date: new Date(),
      check: false,
      select: '',
      showEstablishmentView: false
    }
    this.changeView = (id) => {
      if (this.state.select !== id) this.setState({ select: id })
      else this.setState({select: '' })
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
      if (this.state.date.getMinutes() >= 0 && this.state.date.getMinutes() < 20) this.setState({ options: unsaturatedBrowns, check: !this.state.check })
      if (this.state.date.getMinutes() > 20 && this.state.date.getMinutes() < 40) this.setState({ options: dark, check: !this.state.check })
      if (this.state.date.getMinutes() > 40 && this.state.date.getMinutes() <= 59) this.setState({ options: greenTheme, check: !this.state.check })
    }
  }

  render() {

    //UPDATE MAP LOGIC
    const turn = Math.floor(this.props.establishments.length/10)%6
    console.log('Today\'s map is ', turn)
    const theme = [ blueWater, greenTheme, autumnWorld, unsaturatedBrowns, dark, midnight][turn]
    if(this.props.mapStatus!==theme) this.props.setMapStatus(theme)

    // this.updateMapTheme()
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
          options={theme}
          >
          {
            this.props.establishments.length > 0 && this.props.establishments.map(eachMarker => (

              <Markers
                key={eachMarker.id}
                lat={eachMarker.latitude}
                lng={eachMarker.longitude}
                establishmentName={eachMarker.name}
                establishmentId={eachMarker.id}
                allegiance={eachMarker.allegiance}
                fourSquareId={eachMarker.fourSquareId}
                type="establishment"
                select={this.state.select}
                cb={this.changeView.bind(this)}
              />

            )
            )
          }
          {this.props.markers.length > 0 && this.props.markers.map(eachMarker => (
            <Markers props={this.props}
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

  const mapState = state => ({ markers: state.markers, establishments: state.establishments, trackLocation: state.trackLocation, mapStatus: state.mapStatus })
  const mapDispatch = dispatch => ({setMapStatus: theme=>{dispatch(setMapStatus(theme))}})

  export default connect(mapState, mapDispatch)(Map)

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
