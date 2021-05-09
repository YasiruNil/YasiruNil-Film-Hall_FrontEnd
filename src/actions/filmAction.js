import {
  GET_FILMS_REQUEST,
  CREATE_FILM_REQUEST,
  DELETE_SINGLE_FILM_REQUEST,
  UPDATE_SINGLE_FILM_REQUEST,
} from "../action_types/index"

export const createFilm = (data) => ({
  type: CREATE_FILM_REQUEST,
  data,
})
export const getFilms = () => ({
  type: GET_FILMS_REQUEST,
})
export const deleteAFilm = (data) => ({
  type: DELETE_SINGLE_FILM_REQUEST,
  data,
})
export const updateFilm = (data) => ({
  type: UPDATE_SINGLE_FILM_REQUEST,
  data,
})
