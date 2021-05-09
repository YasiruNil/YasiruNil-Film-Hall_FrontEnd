import "./dashboard.css"
import { connect } from "react-redux"
import { isAuth } from "../core/auth"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Fade from "@material-ui/core/Fade"
import Modal from "@material-ui/core/Modal"
import AddFilm from "../admin/addFilm"
import AddCategory from "../admin/addCategory"
import Backdrop from "@material-ui/core/Backdrop"
import { makeStyles } from "@material-ui/core/styles"
import Card from "../shared/card"
import { getFilms, fetchCategories } from "../../actions/index"
import CategoryCard from "../shared/categoryCard"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper01: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    height: "60%",
  },
  paper02: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))
const AdminDashboard = (props) => {
  const classes = useStyles()
  const { user, token } = isAuth()

  const [open, setOpen] = useState(false)
  const [openFilm, setOpenFilm] = useState(false)
  const [allCategories, setCategories] = useState([])
  const [films, setFilms] = useState([])
  useEffect(() => {
    setCategories(props.fetchCategoriesList)
  }, [props.fetchCategoriesList])
  useEffect(() => {
    props.getFilms()
    props.fetchCategories()
  }, [])
  useEffect(() => {
    setFilms(props.getFilmsList)
  }, [props.getFilmsList])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpenFilm = () => {
    setOpenFilm(true)
  }

  const handleCloseFilm = () => {
    setOpenFilm(false)
  }
  return (
    <div className='admin__dashboard'>
      <div className='admin__dashboard-left'>
        <ul className='admin__dashboard-left-list mt-4'>
          <li className='admin__dashboard-left-item'>
            <button
              className='btn admin__dashboard-left-link'
              onClick={handleOpen}>
              Create Category
            </button>
            <Modal
              aria-labelledby='transition-modal-title'
              aria-describedby='transition-modal-description'
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}>
              <Fade in={open}>
                <div className={classes.paper02}>
                  {<AddCategory handleClose={() => handleClose()} />}
                </div>
              </Fade>
            </Modal>
          </li>
          <li className='admin__dashboard-left-item'>
            <button
              className='btn admin__dashboard-left-link'
              onClick={handleOpenFilm}>
              Create A Film
            </button>
            <Modal
              aria-labelledby='transition-modal-title'
              aria-describedby='transition-modal-description'
              className={classes.modal}
              open={openFilm}
              onClose={handleCloseFilm}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}>
              <Fade in={openFilm}>
                <div className={classes.paper01}>
                  {<AddFilm handleCloseFilm={() => handleCloseFilm()} />}
                </div>
              </Fade>
            </Modal>
          </li>
        </ul>
      </div>

      <div className='admin__dashboard-right mb-4'>
        <h3>Display Films </h3>
        <div className='admin__dashboard-right-films'>
          {films &&
            films.map((item, i) => (
              <Card key={i} className='mb-2 card__items' film={item} />
            ))}
        </div>
        <h3>Display Category List </h3>
        <div className='admin__dashboard-right-films'>
          {allCategories &&
            allCategories.map((item, i) => (
              <CategoryCard
                key={i}
                className='mb-2 category___card-items'
                category={item}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = ({ film, category }) => ({
  getFilmsList: film.getFilms,
  fetchCategoriesList: category.fetchCategories,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getFilms: () => dispatch(getFilms()),
    fetchCategories: () => dispatch(fetchCategories()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
