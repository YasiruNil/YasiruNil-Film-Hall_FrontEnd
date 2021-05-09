import { toast } from "react-toastify"
import { put, takeLatest } from "redux-saga/effects"
import {
  CREATE_CATEGORY_REQUEST,
  FETCH_CATEGORIES_REQUEST,
  UPDATE_SINGLE_CATEGORY_REQUEST,
  CREATE_CATEGORY_REQUEST_FAIL,
  FETCH_CATEGORIES_REQUEST_FAIL,
  UPDATE_SINGLE_CATEGORY_REQUEST_FAIL,
  CREATE_CATEGORY_REQUEST_SUCCESS,
  FETCH_CATEGORIES_REQUEST_SUCCESS,
  UPDATE_SINGLE_CATEGORY_REQUEST_SUCCESS,
} from "../action_types/index"
import {
  createCategory,
  updateCategory,
  fetchCategories,
} from "../services/categoryService"

export function* watcherCreateCategory() {
  yield takeLatest(CREATE_CATEGORY_REQUEST, workerCreateCategory)
}
export function* watcherFetchCategories() {
  yield takeLatest(FETCH_CATEGORIES_REQUEST, workerFetchCategories)
}
export function* watcherUpdateCategory() {
  yield takeLatest(UPDATE_SINGLE_CATEGORY_REQUEST, workerUpdateCategory)
}


function* workerCreateCategory(payload) {
  const { data } = payload
  console.log(data)
  const { _idOfTheUser, token } = data
  const result = yield createCategory(_idOfTheUser, data, token)
  console.log(result)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: CREATE_CATEGORY_REQUEST_SUCCESS,
      response: result.data.content,
    })
    toast.success(result.data.status)
  } else if (result.data.statusCode === 400) {
    yield put({ type: CREATE_CATEGORY_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}
function* workerFetchCategories() {
  const result = yield fetchCategories()
  if (result && result.data.statusCode === 200) {
    yield put({ type: FETCH_CATEGORIES_REQUEST_SUCCESS, response: result.data.content })
  } else if (result.data.statusCode === 400) {
    yield put({ type: FETCH_CATEGORIES_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}

function* workerUpdateCategory(payload) {
  const { data } = payload
  const { categoryId, _idOfTheUser, token } = data
  const result = yield updateCategory(categoryId, _idOfTheUser, data, token)
  if (result && result.data.statusCode === 200) {
    yield put({
      type: UPDATE_SINGLE_CATEGORY_REQUEST_SUCCESS,
      response: result.data.content,
    })
    yield put({ type: FETCH_CATEGORIES_REQUEST })
  } else if (result.data.statusCode === 400) {
    yield put({ type: UPDATE_SINGLE_CATEGORY_REQUEST_FAIL })
    toast.error(result.data.status)
  }
}
