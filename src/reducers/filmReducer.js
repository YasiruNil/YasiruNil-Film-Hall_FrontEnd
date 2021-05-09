import { GET_FILMS_REQUEST_SUCCESS } from "../action_types/index"

const initialstate = {
  getFilms: [],
}
export const filmReducer = (status = initialstate, action) => {
  switch (action.type) {
    case GET_FILMS_REQUEST_SUCCESS:
      return {
        ...status,
        getFilms: action.response,
      }
    default:
      return status
  }
}
