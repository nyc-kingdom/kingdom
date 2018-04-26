// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from '../App';
// import {Provider} from 'react-redux'
// import store from './store'
// import chai from 'chai'


// import {configure, shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'

// import Marker from './Markers'
// import establishments from '../store/establishments';

// const expect = chai.expect

// configure({adapter: new Adapter() })

console.log('WINDOW ', window)


const testMarker = shallow(<Marker type = 'establishment' establishmentName = 'Boners' />)


it('gets the right name', () => {
  expect(testMarker.length).toEqual(1)
});
