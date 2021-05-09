import {
    SIGN_UP_REQUEST,
    SIGN_IN_REQUEST,
    SIGN_OUT_REQUEST,
    CLEAR_SIGN_IN_DATA,
    CLEAR_SIGN_OUT_DATA,
  } from "../action_types/index"
  
  export const UserSignUp = (data) => ({
    type: SIGN_UP_REQUEST,
    data,
  })
  export const UserSignIn = (data) => ({
    type: SIGN_IN_REQUEST,
    data,
  })
  export const userSignOut = () => ({
    type: SIGN_OUT_REQUEST,
  })
  export const clearSignInData = () => ({
    type: CLEAR_SIGN_IN_DATA,
  })
  export const clearSignOutData = () => ({
    type: CLEAR_SIGN_OUT_DATA,
  })

  