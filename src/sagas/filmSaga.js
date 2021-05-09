import { toast } from "react-toastify"
import { put, takeLatest } from "redux-saga/effects"
import {
  GET_FILMS_REQUEST,
  CREATE_FILM_REQUEST,
  GET_FILMS_REQUEST_FAIL,
  CREATE_FILM_REQUEST_FAIL,
  GET_FILMS_REQUEST_SUCCESS,
  CREATE_FILM_REQUEST_SUCCESS,
  DELETE_SINGLE_FILM_REQUEST,
  UPDATE_SINGLE_FILM_REQUEST,
  DELETE_SINGLE_FILM_REQUEST_FAIL,
  UPDATE_SINGLE_FILM_REQUEST_FAIL,
  DELETE_SINGLE_FILM_REQUEST_SUCCESS,
  UPDATE_SINGLE_FILM_REQUEST_SUCCESS,
} from "../action_types/index"
import { getFilms,createFilm,deleteSingleFilm,updateSingleFilm } from "../services/filmServices"

export function* watcherCreateFilm() {
  yield takeLatest(CREATE_FILM_REQUEST, workerCreateFilm)
}
export function* watcherGetFilms() {
  yield takeLatest(GET_FILMS_REQUEST, workerGetFilms)
}
export function* watcherDeleteSingleFilm() {
  yield takeLatest(DELETE_SINGLE_FILM_REQUEST, workerDeleteSingleFilm)
}
export function* watcherUpdateSingleFilm() {
  yield takeLatest(UPDATE_SINGLE_FILM_REQUEST, workerUpdateSingleFilm)
}

function* workerCreateFilm(payload) {
  const { data } = payload
  console.log(data)
  const { _idOfTheUser, token, formData } = data
  const result = yield createFilm(_idOfTheUser, formData, token)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: CREATE_FILM_REQUEST_SUCCESS,
      response: result.data.content,
    })
    toast.success(result.data.status)
  } else if (result.data.statusCode === 400) {
    yield put({ type: CREATE_FILM_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}
function* workerGetFilms() {
  const result = yield getFilms()
  console.log(result)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: GET_FILMS_REQUEST_SUCCESS,
      response: result.data.content,
    })
  } else if (result.data.statusCode === 400) {
    yield put({ type: GET_FILMS_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}

function* workerDeleteSingleFilm(payload) {
  const {data} = payload
  const {filmId,_id,token} = data
  const result = yield deleteSingleFilm(filmId,_id,token)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: DELETE_SINGLE_FILM_REQUEST_SUCCESS,
      response: result.data.content,
    })
    yield put({ type: GET_FILMS_REQUEST })
  } else if (result.data.statusCode === 400) {
    yield put({ type: DELETE_SINGLE_FILM_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}

function* workerUpdateSingleFilm(payload) {
  const {data} = payload
  console.log(data)
  const {filmId, _idOfTheUser, token, formData} = data
  const result = yield updateSingleFilm(filmId, _idOfTheUser, token, formData )
  if (result && result.data.statusCode === 200) {
    yield put({
      type: UPDATE_SINGLE_FILM_REQUEST_SUCCESS,
      response: result.data.content,
    })
    yield put({ type: GET_FILMS_REQUEST })
  } else if (result.data.statusCode === 400) {
    yield put({ type: UPDATE_SINGLE_FILM_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}