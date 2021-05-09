import { get, PostWithToken,putReq  } from './backendClient'

export const fetchCategories = (params) => get('categories', params)

export const createCategory = (_idOfTheUser, data, token ) => PostWithToken(`admin/create-category/${_idOfTheUser}`, data, token)

export const updateCategory = (categoryId, _idOfTheUser, data, token  ) => putReq(`create-category/${categoryId}/${_idOfTheUser}`, data, token)

