import React from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { createMarker } from '../store';
const FOURSQUAREID = require('../secrets').clientID
const FOURSQUARESECRET = require('../secrets').clientSecret
const request = require('request');
// import mapboxgl from 'mapbox-gl'
// import { Map } from './index';


//THESE ARE FULLSTACK COORDS '40.7243,-74.0018'

const invoke = function () {


    request({
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
            client_id: '',
            client_secret: '',
            //ll: '40.7243,-74.0018',
            near: 'New York City, NY',
            query: 'Cafe Grumpy Wall Street',
            v: '20170801',
            limit: 10
        }
    }, function (err, res, body) {
        if (err) {
            console.error(err);
        } else {
            console.log(body);
        }
    });

}

export class Dash extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            queriedMarkers: [],
            userInput: ''
        }

    }

    render() {
        return (
            <div id="Dash">
                <input id='userInput' value={this.state.userInput} onChange={evt=>{this.setState({userInput: evt.target.value})}}></input>
                <button onClick={() => {
                    navigator.geolocation.getCurrentPosition(position => {

                        request({
                            url: 'https://api.foursquare.com/v2/venues/search',
                            method: 'GET',
                            qs: {
                                client_id: FOURSQUAREID,
                                client_secret: FOURSQUARESECRET,
                                ll: position.coords.latitude+','+position.coords.longitude,
                                //near: 'New York City, NY',
                                query: this.state.userInput,
                                v: '20170801',
                                limit: 10
                            }
                        }, (err, res, body) => {
                            if (err) console.error.bind(console)
                            const payLoad = JSON.parse(body)
                            console.log(payLoad)
                            this.setState({ queriedMarkers: payLoad.response.venues })
                            this.props.createMarker(payLoad.response.venues)
                        })
                    })
                }}>Hello</button>

                {this.state.queriedMarkers.length>0 && this.state.queriedMarkers.map(eachMarker => (
                    <Link to={`/singleEstablishment/${eachMarker.id}`}>{eachMarker.name}</Link>
                ))}
                <a href='http://localhost:8080/auth/foursquare'><button>Login</button></a>
             <a href='http://localhost:8080/auth/foursquare'><button>Signup</button></a>
            </div>
        )
    }
}

const mapProps = null
const mapDispatch = dispatch => ({
    createMarker: marker => dispatch(createMarker(marker))

})

export default connect(mapProps, mapDispatch)(Dash)
