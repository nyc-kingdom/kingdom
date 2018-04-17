import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from 'google-map-react'
import { blueWater, unsaturatedBrowns, greenTheme, dark, midnight, autumnWorld } from '../Assets/mapTheme'
import { Markers } from './'
import { setMapStatus } from '../store'
import { knight, userClass } from '../Assets'

export class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: null,
      zoom: 13,
      bootstrapURLKeys: { key: "AIzaSyBqFElyKsNAtWKnM4pnj9CqCRc6u5ruxd4" },
      gestureHandling: 'cooperative',
      options: greenTheme,
      date: new Date(),
      check: false,
      select: '',
      showEstablishmentView: false,
      coords: []
    }
    this.changeView = (id) => {
      if (this.state.select !== id) this.setState({ select: id })
      else this.setState({select: '' })
    }
    this.updateMapTheme = this.updateMapTheme.bind(this)
  }

  componentWillUpdate(nextProps, nextState){
    const [ latProps, lngProps ] = nextProps.trackLocation.coords
    const [ latState, lngState ] = nextState.coords
    let center = !!latProps ? { lat: latProps, lng: lngProps } : null

    if(latProps === undefined) return;
    if(this.state.center === null) this.setState({ center, coords: nextProps.trackLocation.coords })
    else if(latProps !== latState && lngProps !== lngState) this.setState({ center, coords: nextProps.trackLocation.coords })
  }

  updateMapTheme() {
    if (!this.state.check) {
      if (this.state.date.getMinutes() >= 0 && this.state.date.getMinutes() < 20) this.setState({ options: greenTheme, check: !this.state.check })
      if (this.state.date.getMinutes() > 20 && this.state.date.getMinutes() < 40) this.setState({ options: dark, check: !this.state.check })
      if (this.state.date.getMinutes() > 40 && this.state.date.getMinutes() <= 59) this.setState({ options: greenTheme, check: !this.state.check })
    }
  }

  render() {
    //USER BASED CENTER MAP
    if (this.props.trackLocation && this.props.trackLocation.coords && this.props.trackLocation.coords[0] && this.state.center === null){
      const [ lat, lng ] = this.props.trackLocation.coords  
      this.setState({ center: { lat, lng } })
    }

    //UPDATE MAP LOGIC
    const turn = Math.floor(this.props.establishments.length/10)%7
    console.log('Today\'s map is ', turn)
    const theme = [ blueWater, greenTheme, greenTheme, autumnWorld, unsaturatedBrowns, dark, midnight][turn]
    if(this.props.mapStatus!==theme) this.props.setMapStatus(theme)
    //EXPERIMENTAL - MAP PANNING
    // if(this.map) console.log('MAP ', this.map)
    // if(this.map && this.map.map_) {
    //   console.log('HEY ', this.map.map_)
    //   this.map.map_.panTo({lat:40.7794366, lng:-73.96324400000003})
    // }
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
          defaultCenter={{ lat: 40.70, lng: -74.00 }}
          center={this.state.center}
          defaultZoom={this.state.zoom}
          heatmapLibrary={true}
          defaultAverageCenter={true}
          // heatmap={this.state.heatmap}
          options={theme}
          ref = {map => {this.map=map}}
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
          ))
        }
        {
          this.props.markers.length > 0 && this.props.markers.map(eachMarker => (
            <Markers 
            // props={this.props}
              key={eachMarker.venue.id}
              lat={eachMarker.venue.location.lat}
              lng={eachMarker.venue.location.lng}
              establishmentName={eachMarker.venue.name}
              establishmentId={eachMarker.venue.id}
              type="searchResult"
              name={'restaurant'}
            />
          ))
        }
        {
          this.props.trackLocation && this.props.trackLocation.coords && this.props.trackLocation.coords[0] &&
          <Markers
            lat={this.props.trackLocation.coords[0]}
            lng={this.props.trackLocation.coords[1]}
            type="user"
          />
        }
        {/* <div key={1111} lat={this.props.trackLocation.coords[0]} lng={this.props.trackLocation.coords[1]} >
          <img style={{ maxHeight : '20px' }} src={knight}/>
        </div> */}
        </GoogleMapReact>
      </div>
    );
  }
}

  const mapState = state => ({
    markers: state.markers,
    establishments: state.establishments,
    trackLocation: state.trackLocation,
    mapStatus: state.mapStatus,
    user: state.user
  })

  const mapDispatch = dispatch => ({
    setMapStatus: theme => dispatch(setMapStatus(theme))
  })

  export default connect(mapState, mapDispatch)(Map)
