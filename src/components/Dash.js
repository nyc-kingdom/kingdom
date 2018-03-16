import React from 'react'
import { connect } from 'react-redux'
import { createMarker } from '../store';
const request = require('request');
// import mapboxgl from 'mapbox-gl'
// import { Map } from './index';

const invoke = function(){


request({
  url: 'https://api.foursquare.com/v2/venues/explore',
  method: 'GET',
  qs: {
    client_id: 'DDR5GDT5I0EF0WKOAEI2ULAYUI3CDGI3DIAQGWQX1T3RQRCI',
    client_secret: 'IJFDSONXWEC2SV2AEOQ0FAHOPUSH01TOMT0BK2K4AXDCPK4P',
    ll: '40.7243,-74.0018',
    query: 'Cafe Grumpy Wall Street',
    v: '20170801',
    limit: 10
  }
}, function(err, res, body) {
  if (err) {
    console.error(err);
  } else {
    console.log(body);
  }
});

}

export const Dash = (props) => {
    return (
        <div id="Dash">
            <button onClick={() => { 
                navigator.geolocation.getCurrentPosition(position=>{

                        request({url: 'https://api.foursquare.com/v2/venues/search',
                        method: 'GET',
                        qs: {
                            client_id: 'DDR5GDT5I0EF0WKOAEI2ULAYUI3CDGI3DIAQGWQX1T3RQRCI',
                            client_secret: 'IJFDSONXWEC2SV2AEOQ0FAHOPUSH01TOMT0BK2K4AXDCPK4P',
                            ll: position.coords.latitude + ', ' + position.coords.longitude,
                            v: '20170801',
                            limit: 1
                        }
                    }, (err,res,body)=>{console.log(body)})
                })


                //invoke()
                props.createMarker('dummy Marker') }} >Hello</button>
        </div>
    )
}

const mapProps = null
const mapDispatch = dispatch => ({ createMarker: marker => dispatch(createMarker(marker)) })

export default connect(mapProps, mapDispatch)(Dash)
