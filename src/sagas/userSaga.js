import { toast } from "react-toastify"
import { put, takeLatest } from "redux-saga/effects"
import history from "../utility/history"
import {
  SIGN_UP_REQUEST,
  SIGN_IN_REQUEST,
  SIGN_OUT_REQUEST,
  CLEAR_SIGN_IN_DATA,
  CLEAR_SIGN_OUT_DATA,
  SIGN_UP_REQUEST_FAIL,
  SIGN_IN_REQUEST_FAIL,
  SIGN_OUT_REQUEST_FAIL,
  SIGN_UP_REQUEST_SUCCESS,
  SIGN_IN_REQUEST_SUCCESS,
  SIGN_OUT_REQUEST_SUCCESS,
} from "../action_types/index"
import {
  UserSignIn,
  UserSignOut,
  createUserSignUp,
} from "../services/userServices"

export function* watcherUserSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, workerUserSignUp)
}
export function* watcherUserSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, workerUserSignIn)
}
export function* watcherUserSignOut() {
  yield takeLatest(SIGN_OUT_REQUEST, workerUserSignOut)
}

function* workerUserSignUp(payload) {
  const { data } = payload
  const result = yield createUserSignUp(data)
  console.log(result)
  if (result && result.data.statusCode === 200) {
    yield put({ type: SIGN_UP_REQUEST_SUCCESS, response: result.data.user })
    toast.success(result.data.status)
    history.push("/sign-in")
  } else if (result.data.statusCode === 400) {
    yield put({ type: SIGN_UP_REQUEST_FAIL })
    toast.error(`${result.data.error.keyValue.email} already exists`)
  }
}

function* workerUserSignIn(payload) {
  const { data } = payload
  console.log(data)
  const result = yield UserSignIn(data)
  console.log(result)
  if (result && result.data.statusCode === 200) {
    yield put({ type: SIGN_IN_REQUEST_SUCCESS, response: result.data.user })
    yield localStorage.setItem("JWTtoken", JSON.stringify(result.data))
    toast.success(result.data.status)
    if (result.data.user.role === 1) {
      history.push("/admin/dashboard")
    } else {
      history.push("/dashboard")
    }
    yield put({ type: CLEAR_SIGN_OUT_DATA })
  } else if (result.data.statusCode === 400) {
    yield put({ type: SIGN_IN_REQUEST_FAIL })
    toast.error(result.data.error)
  } else if (result.data.statusCode === 401) {
    yield put({ type: SIGN_IN_REQUEST_FAIL })
    toast.error(result.data.error)
  }
}

function* workerUserSignOut() {
  const result = yield UserSignOut()
  if (result && result.data.statusCode === 200) {
    yield put({
      type: SIGN_OUT_REQUEST_SUCCESS,
      response: result.data.message,
    })
    yield localStorage.removeItem("JWTtoken")
    toast.success(result.data.message)
    yield put({ type: CLEAR_SIGN_IN_DATA })
  } else if (result.data.statusCode === 400) {
    yield put({ type: SIGN_OUT_REQUEST_FAIL })
  }
}
