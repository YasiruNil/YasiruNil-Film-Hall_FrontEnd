import { connect } from "react-redux"
import { isAuth } from "../core/auth"
import React, { useState } from "react"
import { updateCategory} from "../../actions/categoryAction"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

const EditCategory = (props) => {
  const { category } = props
  console.log(category)
  let initialName = category.name
  const [name, setName] = useState(initialName)

  const { user, token } = isAuth()
  const handleChange = (e) => {
    setName(e.target.value)
  }
  const handleSubmit = async (e) => {
    let _idOfTheUser = user._id
    let categoryId = category._id
    const data = {categoryId, _idOfTheUser, name, token }
    props.updateCategory(data)
  }
  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <div className='container mt-4'>
        <div className='row '>
          <div className='col-md-12'>
            <TextValidator
              label='Category Name'
              value={name}
              name='name'
              onChange={handleChange}
              fullWidth
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              validators={["required"]}
              errorMessages={["This field is required!"]}
            />
          </div>
        </div>
      </div>
      <div className='container mt-3'>
        <button type='submit' className='btn btn-white custom__button'>
          Submit
        </button>
      </div>
    </ValidatorForm>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCategory: (data) => dispatch(updateCategory(data)),
  }
}

export default connect(null, mapDispatchToProps)(EditCategory)
