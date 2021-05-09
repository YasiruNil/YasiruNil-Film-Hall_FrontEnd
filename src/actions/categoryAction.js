import { CREATE_CATEGORY_REQUEST,FETCH_CATEGORIES_REQUEST, UPDATE_SINGLE_CATEGORY_REQUEST } from "../action_types/index"

export const createCategory = (data) => ({
  type: CREATE_CATEGORY_REQUEST,
  data,
})
export const fetchCategories = () => ({
  type: FETCH_CATEGORIES_REQUEST,
})
export const updateCategory = (data) => ({
  type: UPDATE_SINGLE_CATEGORY_REQUEST,
  data,
})
