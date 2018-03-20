import distanceCalc from './distanceCalc'

const axios = require('axios')
const request = require('request');
const FOURSQUAREID = require('../secrets').clientID
const FOURSQUARESECRET = require('../secrets').clientSecret

const flickr = require('../secrets').flickrAPIKey



const fullstack = { lat: 40.705076, lng: -74.00916000000001}



const checkIn = (user, place) => {
    const lat = place.location.lat;
    const long = place.location.lng;

    navigator.geolocation.getCurrentPosition((position) => {
        //console.log('ME', distanceCalc(fullstack.lat,fullstack.lng,position.coords.latitude , position.coords.longitude)) //0.0001226713495550171
        console.log(distanceCalc(lat, long, position.coords.latitude , position.coords.longitude))
        if(distanceCalc(lat, long, position.coords.latitude , position.coords.longitude) > 0.0005) console.log('YOU ARE NOT HERE')
        else{
        
            console.log('Congratulations, it is true that you are at ', place.name)

            const flckr = axios.get(`https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon&api_key=${flickr}&lat=${lat}&lon=${long}&format=json&nojsoncallback=1`).then(res=>res.data)
            
            const fsq = axios.post(`https://api.foursquare.com/v2/checkins/add?venueId=${place.id}&v=20170801&oauth_token=${user.token}`).then(res=>res.data)
                    
            Promise.all([flckr,fsq]).then(resArr => {
                console.log('THIS IS OUR KINGDOM ', resArr[0].places.place[0].woe_name)
                console.log('Does the check-in return us something?', resArr[1].response.checkIn)
            })
        }
    })
}
export default checkIn




// request({
//     url: `https://api.flickr.com/services/rest/?method=flickr.places.findByLatLon&api_key=${flickr}&lat=${lat}&lon=${long}&format=json&nojsoncallback=1`,
//     method: 'GET'
// }, (err, res, body) => {
//     if (err) console.error.bind(console)
//     const payLoad = JSON.parse(body)
//     console.log(payLoad)
//     const neighborhood = payLoad.places.place[0].woe_name;
//     console.log('THIS KINGDOM - ', neighborhood)

// })


// const fsq = await request({
//     url: 'https://api.foursquare.com/v2/checkins/add',
//     method: 'POST',
//     qs: {
//         venueId: place.id,
//         v: '20170801',
//         oauth_token: user.token
//     }
// }, (err, res, body) => {
//     if (err) console.error.bind(console)
//     const payLoad = JSON.parse(body)
//     console.log(payLoad)
// })