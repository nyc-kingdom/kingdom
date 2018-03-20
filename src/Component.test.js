import React from 'react'   
import Dash from './components/Dash'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Provider} from 'react-redux'
import store from './store'
import chai from 'chai'
const expect = chai.expect

// const React = require('react')
// const Dash = require('../Dash')
// const Enzyme = require('enzyme')
// const shallow = Enzyme.shallow
// const Adapter = require('enzye-adapter-react-16')



Enzyme.configure({adapter: new Adapter()})

describe('Dashboard', ()=>{

const dashBoard = shallow((<Provider store={store}><Dash user={{name: 'Imposter'}}/></Provider>))
console.log('Look!', dashBoard)

    it('will display the user name', ()=>{

        console.log('!!!', dashBoard.find('hello'))
        expect(dashBoard.find('hello')).to.exist
    })
})