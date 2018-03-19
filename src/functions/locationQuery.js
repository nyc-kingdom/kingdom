const request = require('request');
const FOURSQUAREID = require('../secrets').clientID
const FOURSQUARESECRET = require('../secrets').clientSecret

const locationQuery = (context) => {

        navigator.geolocation.getCurrentPosition(position => {

            request({
                url: 'https://api.foursquare.com/v2/venues/explore',
                method: 'GET',
                qs: {
                    client_id: FOURSQUAREID,
                    client_secret: FOURSQUARESECRET,
                    ll: position.coords.latitude+','+position.coords.longitude,
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
                console.log('YOYOYOYO', payLoad)
                context.setState({ queriedMarkers: payLoad.response.groups[0].items })
                context.props.createMarker(payLoad.response.groups[0].items)
            })
        })

    }

    export default locationQuery


export const checkIn = (context, marker) => {






    request({
        url: 'https://api.foursquare.com/v2/checkins/add',
        method: 'POST',
        qs: {
            venueId: marker.id,
            v: '20170801',
            oauth_token: context.props.user.token
        }
    }, (err, res, body) => {
        if (err) console.error.bind(console)
        const payLoad = JSON.parse(body)
        console.log(payLoad)
    })
}



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