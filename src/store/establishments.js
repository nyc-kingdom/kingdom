import axios from 'axios';

const GET_ESTABLISHMENTS = 'GET_ESTABLISHMENTS';
const ADD_ESTABLISHMENT = 'ADD_ESTABLISHMENT'

const getEstablishments = establishments => {
  const action = {type: GET_ESTABLISHMENTS, establishments};
  return action;
}

export const paintEstablishment = establishment => ({type: ADD_ESTABLISHMENT, establishment})

export const fetchEstablishments = () => dispatch => {
  return axios.get('http://localhost:8080/api/establishments')
  .then(establishments => dispatch(getEstablishments(establishments.data)))
  .catch(console.error.bind(console))
}

export default (state = [], action) => {
  switch (action.type) {
    case GET_ESTABLISHMENTS:
      return action.establishments;
    case ADD_ESTABLISHMENT:
      return [...state, action.establishment]
    default:
      return state;
  }
}
