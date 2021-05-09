import { connect } from "react-redux"
import { isAuth } from "../core/auth"
import Button from "@material-ui/core/Button"
import MenuItem from "@material-ui/core/MenuItem"
import React, { useState, useEffect } from "react"
import FormControl from "@material-ui/core/FormControl"
import { createFilm, fetchCategories } from "../../actions/index"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator"

const AddFilm = (props) => {
  const [categories, setCategories] = useState([])
  const [film, setFilm] = useState({
    name: "",
    price: "",
    photo: "",
    director: "",
    category: "",
    mainActor: "",
    secondActor: "",
    description: "",
    releasedDate: "",
    ticketQuantity: "",
    formData: new FormData(),
  })
  const { user, token } = isAuth()

  const handleChange = (e) => {
    setFilm({ ...film, [e.target.name]: e.target.value })
  }
  const handleChangePhoto = (e) => {
    setFilm({ ...film, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    const {
      name,
      photo,
      price,
      director,
      formData,
      category,
      mainActor,
      secondActor,
      description,
      releasedDate,
      ticketQuantity,
    } = film

    formData.append("name", name)
    formData.append("photo", photo)
    formData.append("price", price)
    formData.append("director", director)
    formData.append("category", category)
    formData.append("mainActor", mainActor)
    formData.append("secondActor", secondActor)
    formData.append("description", description)
    formData.append("releasedDate", releasedDate)
    formData.append("ticketQuantity", ticketQuantity)

    let _idOfTheUser = user._id
    const data = { _idOfTheUser, formData, token }
    props.createFilm(data)
    props.handleCloseFilm()
  }
  useEffect(() => {
    props.fetchCategories()
  }, [])
  useEffect(() => {
    setCategories(props.categories)
  }, [props.categories])
  return (
    <>
      <ValidatorForm onSubmit={handleSubmit}>
        <div className='container mt-4'>
          <div className='row mb-3'>
            <div className='col-md-6 mb-3'>
              <TextValidator
                label='Film Name'
                value={film.name}
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
            <div className='col-md-6'>
              <FormControl variant='outlined' fullWidth>
                <TextValidator
                  id='select'
                  select
                  fullWidth
                  size='small'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={film.category}
                  onChange={handleChange}
                  name='category'
                  label='Category'>
                  {categories &&
                    categories.map((c, i) => (
                      <MenuItem value={c._id}>{c.name}</MenuItem>
                    ))}
                </TextValidator>
              </FormControl>
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-md-6'>
              <TextValidator
                label='Main Actor'
                value={film.mainActor}
                name='mainActor'
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
                value={film.secondActor}
                name='secondActor'
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
                value={film.director}
                name='director'
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
                name='releasedDate'
                value={film.releasedDate}
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
                value={film.price}
                name='price'
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
                value={film.ticketQuantity}
                name='ticketQuantity'
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
                value={film.description}
                name='description'
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
    </>
  )
}
const mapStateToProps = ({ category }) => ({
  categories: category.fetchCategories,
})
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
    createFilm: (data) => dispatch(createFilm(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFilm)
