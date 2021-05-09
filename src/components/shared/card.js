import "./card.css"
import React, { useState } from "react"
import { connect } from "react-redux"
import { isAuth } from "../core/auth"
import EditFilm from "../admin/editFilm"
import { APIBASEURL } from "../../config"
import Fade from "@material-ui/core/Fade"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import { deleteAFilm } from "../../actions/index"
import { makeStyles } from "@material-ui/core/styles"
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    height: "60%",
  },
}))

const Card = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const {
    user: { _id },
    token,
  } = isAuth()

  const handleDelete = (filmId) => {
    const data = { filmId, _id, token }
    props.deleteAFilm(data)
  }
  return (
    <div className='card' style={{ width: "60%" ,marginBottom:"10px" }}>
      <div className='card-body'>
        <h5 className='card-title'>{props.film.name}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>
          {props.film.description}
        </h6>
        <img
          src={`${APIBASEURL}film/photo/${props.film._id}`}
          alt={props.film.name}
          className='mb-3'
          style={{
            Height: "70%",
            width: "100%",
          }}></img>
        <div className='btn__edit-delete'>
          <button
            type='submit'
            className='btn btn-white custom__button m-1'
            onClick={handleOpen}>
            Edit
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
              <div className={classes.paper}>
                {
                  <EditFilm
                    film={props.film}
                    setFilms={props.setFilms}
                    handleCloseFilm={() => handleClose()}
                  />
                }
              </div>
            </Fade>
          </Modal>
          <button
            type='submit'
            className='btn btn-white custom__button m-1'
            onClick={() => handleDelete(props.film._id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {

    deleteAFilm: (data) => dispatch(deleteAFilm(data)),
  }
}

export default connect(null, mapDispatchToProps)(Card)
