import { all, fork } from "redux-saga/effects"
import {
  watcherUserSignUp as UserSignUp,
  watcherUserSignIn as UserSignIn,
  watcherUserSignOut as UserSignOut,
} from "./userSaga"
import {
  watcherCreateCategory as CreateCategory,
  watcherUpdateCategory as UpdateCategory,
  watcherFetchCategories as FetchCategories,
} from "./categorySaga"
import {
  watcherGetFilms as GetFilms,
  watcherCreateFilm as CreateFilm,
  watcherDeleteSingleFilm as DeleteSingleFilm,
  watcherUpdateSingleFilm as UpdateSingleFilm,
} from "./filmSaga"
export default function* rootSaga() {
  yield all([
    fork(GetFilms),
    fork(CreateFilm),
    fork(UserSignUp),
    fork(UserSignIn),
    fork(UserSignOut),
    fork(CreateCategory),
    fork(UpdateCategory),
    fork(FetchCategories),
    fork(DeleteSingleFilm),
    fork(UpdateSingleFilm),
  ])
}
