import "./core.css"
import { connect } from "react-redux"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import { UserSignIn } from "../../actions/index"
import LockOpenIcon from "@material-ui/icons/LockOpen"
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import InputAdornment from "@material-ui/core/InputAdornment"

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

const SignIn = (props) => {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  })
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }
  const handleSubmitForm = () => {
    // your submit logic
    const { email, password } = fields
    const data = { email, password }
    console.log(email)
    props.UserSignIn(data)
  }
  const signInForm = () => {
    return (
      <>
        <ValidatorForm onSubmit={handleSubmitForm}>
          <div className='row '>
            <div className='col-md-12 signin-form'>
              <TextValidator
                label='Email'
                size='small'
                value={fields.email}
                name='email'
                onChange={handleChange}
                validators={["required", "isEmail"]}
                errorMessages={[
                  "This field is required!",
                  "Enter a Valid Email",
                ]}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  style: { color: "black" },
                  endAdornment: (
                    <InputAdornment position='end'>
                      <MailOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className='col-md-12 mt-4 signin-form'>
              <TextValidator
                label='Password'
                value={fields.password}
                name='password'
                onChange={handleChange}
                size='small'
                type='password'
                validators={["required"]}
                errorMessages={["This field is required!"]}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  style: { color: "black" },
                  endAdornment: (
                    <InputAdornment position='end'>
                      <LockOpenIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
          <div className='col-md-12 mt-4  mb-4 signin-form'>
            <button type='submit' className='btn btn-white custom__button'>
              Submit
            </button>
          </div>
        </ValidatorForm>
      </>
    )
  }

  return (
    <div className='form__box'>
      <h3 className='form__box-signin mb-4'> SignIn</h3>
      {signInForm()}
      <Link to='/sign-up' className='form__box-signin mb-4'>
        Don't have an account?Create yours now!
      </Link>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    UserSignIn: (data) => dispatch(UserSignIn(data)),
  }
}
export default connect(null, mapDispatchToProps)(SignIn)
