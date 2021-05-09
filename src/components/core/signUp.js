import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { UserSignUp } from "../../actions/index"
import React, { useState, useEffect } from "react"
import InputAdornment from "@material-ui/core/InputAdornment"
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline"
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

const SignUp = (props) => {
  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  })
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== fields.password) {
        return false
      }
      return true
    })
  }, [fields, fields.confirm_password])
  const handleSubmit = (e) => {
    // your submit logic
    e.preventDefault()
    const { name, email, password } = fields
    const data = { name, email, password }
    props.UserSignUp(data)
  }
  const signUpForm = () => {
    return (
      <ValidatorForm onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-md-6 mb-2'>
            <TextValidator
              label='Name'
              value={fields.name}
              name='name'
              onChange={handleChange}
              fullWidth
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              validators={["required"]}
              errorMessages={["This field is required!"]}
              InputProps={{
                style: { color: "black" },
                endAdornment: (
                  <InputAdornment position='end'>
                    <PeopleOutlineIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className='col-md-6 mb-2'>
            <TextValidator
              label='Email'
              value={fields.email}
              name='email'
              size='small'
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              validators={["required", "isEmail"]}
              errorMessages={["This field is required!", "email is not valid"]}
              InputProps={{
                style: { color: "black" },
                endAdornment: (
                  <InputAdornment position='end'>
                    <MailOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-md-6 mb-2'>
            <TextValidator
              label='Password'
              value={fields.password}
              name='password'
              onChange={handleChange}
              fullWidth
              size='small'
              type='password'
              InputLabelProps={{
                shrink: true,
              }}
              validators={[
                "required",
                "matchRegexp:^(((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})",
              ]}
              errorMessages={[
                "This field is required!",
                "Should have a letter and uppcase",
              ]}
              InputProps={{
                style: { color: "black" },
                endAdornment: (
                  <InputAdornment position='end'>
                    <LockOpenOutlinedIcon/>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className='col-md-6 mb-2'>
            <TextValidator
              label='Confirm Password'
              value={fields.confirm_password}
              name='confirm_password'
              onChange={handleChange}
              fullWidth
              size='small'
              type='password'
              InputLabelProps={{
                shrink: true,
              }}
              validators={["required", "isPasswordMatch"]}
              errorMessages={["This field is required!", "password mismatch"]}
              InputProps={{
                style: { color: "black" },
                endAdornment: (
                  <InputAdornment position='end'>
                    <LockOpenOutlinedIcon />
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
    )
  }
  return (
    <div className='form__box p-4'>
      <h3 className='form__box-signup mb-5'> Create an Account</h3>
      {signUpForm()}
      <Link to='/sign-in' className='form__box-signup mb-4'>
        Have an Account?Click!
      </Link>
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    UserSignUp: (data) => dispatch(UserSignUp(data)),
  }
}

export default connect(null, mapDispatchToProps)(SignUp)
