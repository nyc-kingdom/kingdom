const distanceCalc = (latA, lngA, latB, lngB, accuracy=1) => {

    const length = latA-latB
    const height = lngA-lngB
    const hypo = (length*length) + (height*height)
    const res = Math.sqrt(hypo)

    return res
}

export default distanceCalc

// const fullstack = { lat: 40.705076, lng: -74.00916000000001}
// const alHorno = { lat: 40.70469069999999, lng: -74.00880489999997}
// const ubs = { lat: 40.7214319, lng: -73.9956894 }
// const moma = {lat: 40.7614327, lng: -73.97762160000002}

// console.log('alHorno', distanceCalc(fullstack.lat,fullstack.lng,alHorno.lat,alHorno.lng))
// console.log('ubs', distanceCalc(fullstack.lat,fullstack.lng,ubs.lat,ubs.lng))
// console.log('moma', distanceCalc(fullstack.lat,fullstack.lng,moma.lat,moma.lng))

// navigator.geolocation.getCurrentPosition(position=>{
//     console.log('ME', distanceCalc(fullstack.lat,fullstack.lng,position.coords.latitude , position.coords.longitude))
// })

