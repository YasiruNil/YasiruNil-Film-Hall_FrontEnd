import { get, post, getWithToken, putReq } from "./backendClient"

export const UserSignIn = (data) => post("sign-in", data)

export const createUserSignUp = (data) => post("sign-up", data)

export const UserSignOut = (params) => get("sign-out", params)
