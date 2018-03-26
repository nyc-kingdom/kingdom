import axios from 'axios';

//const serverUrl = 'http://localhost:8080'
const serverUrl = 'https://kingdom-server.herokuapp.com'

const GET_KINGDOMS = 'GET_KINGDOMS';

const getKingdoms = kingdoms => {
  const action = {type: GET_KINGDOMS, kingdoms};
  return action;
}

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