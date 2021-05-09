import { get, adminPostWithFormData, deleteWithToken } from './backendClient'

 export const getFilms = () => get('films')

 export const createFilm = ( _idOfTheUser, data, token ) => adminPostWithFormData(`admin/create-film/${_idOfTheUser}`, data, token)

 export const deleteSingleFilm = (filmId,userId,token) => deleteWithToken(`film/${filmId}/${userId}`,token)

 export const updateSingleFilm = (filmId,userId,token,data) => adminPostWithFormData(`film/${filmId}/${userId}`,data,token)

 