/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { fetchCheckins, addCheckin, editCheckin, removeCheckin } from './'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import serverUrl from '../environment'


const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)


describe('Thunk creators:', () => {
  let store
  let mockAxios

  const initialState = [];

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchCheckins', () => {
    it('fetches all Checkins data', () => {
      const fakeCheckins = [{
        quantity: 23,
        lastCheckin: 'Tue Mar 10 2018 12:22:00 GMT-0400 (EDT)',
        userId: 1,
        establishmentId: 3,
      }, {
        quantity: 40,
        lastCheckin: 'Tue Mar 15 2018 10:48:36 GMT-0400 (EDT)',
        userId: 2,
        establishmentId: 4,
      }]
      mockAxios.onGet(`${serverUrl}/api/checkins`).replyOnce(200, fakeCheckins)
      return store.dispatch(fetchCheckins())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_CHECKINS')
          expect(actions[0].Checkins).to.be.deep.equal(fakeCheckins)
        })
    })
  })

  describe('addCheckin', () => {
    it('adds a Checkin to the store', () => {
      const fakeCheckin = {
        userId: 3,
        establishmentId: 3,
      }
      mockAxios.onPost(`${serverUrl}/api/checkins`).replyOnce(200, fakeCheckin)
      return store.dispatch(addCheckin())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('CREATE_CHECKIN')
          expect(actions[0].Checkin.quantity).to.be.equal(1)
          expect(actions[0].Checkin.userId).to.be.equal(fakeCheckin.userId)
          expect(actions[0].Checkin.establishmentId).to.be.equal(fakeCheckin.establishmentId)
        })
    })
  })

  describe('updateCheckin', () => {
    it('updates a Checkin in store', () => {
      const userId = 1
      const establishmentId = 3
    //   const quantity = 19 // what about quantity from 'FourSquare'

      mockAxios.onPut(`${serverUrl}/api/checkins?user=${userId}&establishment=${establishmentId}`).replyOnce(200, fakeCheckin)
      return store.dispatch(editCheckin(userId, establishmentId))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('UPDATE_CHECKIN')
          expect(actions[0].Checkin).to.be.deep.equal(fakeCheckin.quantity + 1)
        })
    })
  })

  describe('removeCheckin', () => {
    it('deletes a Checkin from store', () => {
      mockAxios.onDelete(`${serverUrl}/api/checkins?establishment=${establishmentId}`).replyOnce(200)
      return store.dispatch(removeCheckin(1))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('DELETE_CHECKIN')
        })
    })
  })
})
