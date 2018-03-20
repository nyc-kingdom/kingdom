import { closeSync } from 'fs';

const request = require('request');
const FOURSQUAREID = require('../secrets').clientID
const FOURSQUARESECRET = require('../secrets').clientSecret


    //THESE ARE FULLSTACK COORDS '40.7243,-74.0018'

const locationQuery = (context) => {
        // navigator.geolocation.getCurrentPosition(position => {

            request({
                url: 'https://api.foursquare.com/v2/venues/explore',
                method: 'GET',
                qs: {
                    client_id: FOURSQUAREID,
                    client_secret: FOURSQUARESECRET,
                    ll: '40.741895, -73.989308',
                    //near: 'New York City, NY',
                    query: context.state.userInput,
                    sortByDistance: 1,
                    oauth_token: context.props.user.token,
                    v: '20170801',
                    limit: 10
                }
            }, (err, res, body) => {
                if (err) console.error.bind(console)
                const payLoad = JSON.parse(body)
                context.setState({ queriedMarkers: payLoad.response.groups[0].items })
                context.props.createMarker(payLoad.response.groups[0].items)
            // })
        })

    }

    export default locationQuery


export const checkIn = (context, marker) => {
    const lat = marker.venue.location.lat;
    const long = marker.venue.location.lng;

    request({
        url: `https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon&api_key=d86308194ea517acd62ad69af14025ac&lat=${lat}&lon=${long}&format=json&nojsoncallback=1`,
        method: 'GET'
    }, (err, res, body) => {
        if (err) console.error.bind(console)
        const payLoad = JSON.parse(body)
        const neighborhood = payLoad.places.place[0].woe_name;
    })



    request({
        url: 'https://api.foursquare.com/v2/checkins/add',
        method: 'POST',
        qs: {
            venueId: marker.venue.id,
            v: '20170801',
            oauth_token: context.props.user.token
        }
    }, (err, res, body) => {
        if (err) console.error.bind(console)
        const payLoad = JSON.parse(body)
        console.log(payLoad)
    })
}

export const getUserCheckIns = context => {

    console.log('USER', context.props.user)

    request({
        url: 'https://api.foursquare.com/v2/users/self/checkins',
        method: 'GET',
        qs: {
            v: '20170801',
            oauth_token: context.props.user.token
        }
    }, (err, res, body) => {
        if (err) console.error.bind(console)
        const payLoad = JSON.parse(body)
        console.log('You visited ', payLoad)
        context.props.createMarker(payLoad.response.checkins.items)
    })
}














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
