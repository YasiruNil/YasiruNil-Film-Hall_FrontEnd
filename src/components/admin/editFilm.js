import React, { useState } from "react"
import { connect } from "react-redux"
import { isAuth } from "../core/auth"
import Button from "@material-ui/core/Button"
import { updateFilm } from "../../actions/index"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

const EditFilm = (props) => {
  const { user, token } = isAuth()
  const {
    _id,
    name,
    price,
    category,
    director,
    mainActor,
    secondActor,
    description,
    releasedDate,
    ticketQuantity,
  } = props.film
  const [newValues, setNewValues] = useState({
    photo: "",
    newName: name,
    newPrice: price,
    newDirector: director,
    newMainActor: mainActor,
    formData: new FormData(),
    newDescription: description,
    newSecondActor: secondActor,
    newReleasedDate: releasedDate,
    newTicketQuantity: ticketQuantity,
  })
  const handleChange = (e) => {
    setNewValues({ ...newValues, [e.target.name]: e.target.value })
  }
  const handleChangePhoto = (e) => {
    setNewValues({ ...newValues, [e.target.name]: e.target.files[0] })
  }
  const handleSubmit = () => {
    const {
      newName,
      newDescription,
      newMainActor,
      newDirector,
      newReleasedDate,
      newTicketQuantity,
      newPrice,
      newSecondActor,
      photo,
      formData,
    } = newValues
    console.log(category)
    const categoryId = category._id
    formData.append("name", newName)
    formData.append("photo", photo)
    formData.append("price", newPrice)
    formData.append("director", newDirector)
    formData.append("category", categoryId)
    formData.append("mainActor", newMainActor)
    formData.append("secondActor", newSecondActor)
    formData.append("description", newDescription)
    formData.append("releasedDate", newReleasedDate)
    formData.append("ticketQuantity", newTicketQuantity)

    let _idOfTheUser = user._id
    let filmId = _id
    const data = { filmId, _idOfTheUser, token, formData }
    props.updateFilm(data)
  }
  
  return (
    <ValidatorForm onSubmit={handleSubmit}>
      <div className='container mt-4'>
        <div className='row mb-3'>
          <div className='col-md-6 mb-3'>
            <TextValidator
              label='Film Name'
              value={newValues.newName}
              name='newName'
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
        <div className='row mb-3'>
          <div className='col-md-6'>
            <TextValidator
              label='Main Actor'
              value={newValues.newMainActor}
              name='newMainActor'
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
          <div className='col-md-6'>
            <TextValidator
              label='Second Actor'
              value={newValues.newSecondActor}
              name='newSecondActor'
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
        <div className='row mb-3'>
          <div className='col-md-6'>
            <TextValidator
              label='Director'
              value={newValues.newDirector}
              name='newDirector'
              onChange={handleChange}
              fullWidth
              rows={3}
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              validators={["required"]}
              errorMessages={["This field is required!"]}
            />
          </div>
          <div className='col-md-6'>
            <TextValidator
              id='date'
              label='Released Date'
              type='date'
              name='newReleasedDate'
              value={newValues.newReleasedDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              validators={["required"]}
              errorMessages={["This field is required!"]}
            />
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-md-6 mb-3'>
            <TextValidator
              label='Price'
              value={newValues.newPrice}
              name='newPrice'
              onChange={handleChange}
              fullWidth
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              validators={[
                "required",
                "minNumber:0",
                "maxNumber:1000000",
                "matchRegexp:^[0-9]+$",
              ]}
              errorMessages={[
                "This field is required!",
                "Should be Greater than 0",
                "Should be less than 10 Laks",
                "Should be a Number",
              ]}
            />
          </div>
          <div className='col-md-6'>
            <TextValidator
              label='Quantity'
              value={newValues.newTicketQuantity}
              name='newTicketQuantity'
              onChange={handleChange}
              fullWidth
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              validators={[
                "required",
                "minNumber:0",
                "maxNumber:100000",
                "matchRegexp:^[0-9]+$",
              ]}
              errorMessages={[
                "This field is required!",
                "Should be Greater than 0",
                "Should be less than 1 Laks",
                "Should be a Number",
              ]}
            />
          </div>
        </div>
        <div className='row mb-3'>
          <div className='col-md-12'>
            <TextValidator
              label='Description'
              value={newValues.newDescription}
              name='newDescription'
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
              validators={["required"]}
              errorMessages={["This field is required!"]}
            />
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12 mb-3'>
            <Button variant='contained' color='primary' component='span'>
              <input
                accept='image/*'
                style={{ border: "none" }}
                id='contained-button-file'
                type='file'
                name='photo'
                onChange={handleChangePhoto}
              />
            </Button>
          </div>
        </div>
      </div>
      <div className='container mt-3 mb-3'>
        <button type='submit' className='btn btn-white custom__button'>
          Submit
        </button>
      </div>
    </ValidatorForm>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilm: (data) => dispatch(updateFilm(data)),
  }
}

export default connect(null, mapDispatchToProps)(EditFilm)
