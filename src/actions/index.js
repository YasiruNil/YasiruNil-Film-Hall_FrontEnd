import {
  UserSignUp,
  userSignOut,
  UserSignIn,
  clearSignInData,
  clearSignOutData,
} from "./userAction"
import { getFilms,updateFilm, createFilm, deleteAFilm } from "./filmAction"
import { createCategory, fetchCategories,updateCategory } from "./categoryAction"


export {
  getFilms,
  updateFilm,
  createFilm,
  UserSignUp,
  UserSignIn,
  userSignOut,
  deleteAFilm,
  updateCategory,
  createCategory,
  fetchCategories,
  clearSignInData,
  clearSignOutData,
}
