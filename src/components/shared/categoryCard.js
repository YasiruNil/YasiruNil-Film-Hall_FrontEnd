import "./card.css"
import React, { useState } from "react"
import Fade from "@material-ui/core/Fade"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import EditCategory from "../admin/editCategory"
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

const CategoryCard = (props) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div className='card' style={{ width: "60%", marginBottom: "10px"}}>
      <div className='card-body'>
        <h5 className='card-title'>{props.category.name}</h5>
        <div className='btn__edit-delete'>
          <button
            type='submit'
            className='btn btn-white custom__button m-2'
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
                  <EditCategory
                    category={props.category}
                    handleClose={() => handleClose()}
                  />
                }
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  )
}


  export default CategoryCard
  
