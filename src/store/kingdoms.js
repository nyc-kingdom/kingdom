import axios from 'axios';
import serverUrl from '../environment'


const GET_KINGDOMS = 'GET_KINGDOMS';

const getKingdoms = kingdoms => ({type: GET_KINGDOMS, kingdoms})

export const fetchKingdoms = () => dispatch => {
  return axios.get(`${serverUrl}/api/kingdoms`)
  .then(kingdoms => dispatch(getKingdoms(kingdoms.data)))
  .catch(console.error.bind(console))
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_KINGDOMS:
      return action.kingdoms;
    default:
      return state;
  }
}