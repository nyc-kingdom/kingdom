import { closeSync } from 'fs';

const request = require('request');
const FOURSQUAREID = require('../secrets').clientID
const FOURSQUARESECRET = require('../secrets').clientSecret

    //THESE ARE FULLSTACK COORDS '40.7243,-74.0018'

const locationQuery = dispatch => (userInput, user) => {
        // navigator.geolocation.getCurrentPosition(position => {

    request({
        url: 'https://api.foursquare.com/v2/venues/explore',
        method: 'GET',
        qs: {
            client_id: FOURSQUAREID,
            client_secret: FOURSQUARESECRET,
            ll: '40.741895, -73.989308',
            //near: 'New York City, NY',
            query: userInput,
            sortByDistance: 1,
            oauth_token: user.token,
            v: '20170801',
            limit: 10
        }
    }, (err, res, body) => {
        if (err) console.error.bind(console)
        const payLoad = JSON.parse(body)
        // context.setState({ queriedMarkers: payLoad.response.groups[0].items })
        // context.props.createMarker(payLoad.response.groups[0].items)
    // })
    })
}

export default locationQuery

export const checkIn = (context, marker) => {
    const lat = marker.venue.location.lat;
    const long = marker.venue.location.lng;

    request({
        url: `https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon&api_key=d51c3445ff4a06e9924634ba7a106c48&lat=${lat}=${long}&format=json&nojsoncallback=1&auth_token=72157666917274988-cf8b53ee82e395be&api_sig=3b6eddf841b9a1f7c06b3f4fd29b5b56`,
        method: 'GET'
    }, (err, res, body) => {
        if (err) console.error.bind(console)
        const payLoad = JSON.parse(body)
        console.log("payLoad: ", payLoad)
        // const neighborhood = payLoad.places.place[0].woe_name;
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

// export const getUserCheckIns = dispatch => user => {

//     console.log('USER', user)

//     request({
//         url: 'https://api.foursquare.com/v2/users/self/checkins',
//         method: 'GET',
//         qs: {
//             v: '20170801',
//             oauth_token: user.token
//         }
//     }, (err, res, body) => {
//         if (err) console.error.bind(console)
//         const payLoad = JSON.parse(body)
//         console.log('You visited ', payLoad)
//         dispatch(createMarker(payLoad.response.checkins.items))
//     })
// }






