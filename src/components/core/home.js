import "./core.css"
import MovieIcon from "@material-ui/icons/Movie"
import React, { useState, useEffect } from "react"
import ClipLoader from "react-spinners/ClipLoader"
import { css } from "@emotion/core"
import { connect } from "react-redux"
import Moment from "react-moment"
import { getFilms } from "../../actions/index"
import { APIBASEURL } from "../../config"
const override = css`
  display: flex
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  border-color: white
`
const Home = (props) => {
  const [films, setFilms] = useState([])
  let [loading, setLoading] = useState(true)
  let [color, setColor] = useState("#ffffff")
  const [oneFilmItem, setOneFilmItem] = useState({})

  useEffect(() => {
    props.getFilms()
  }, [])
  useEffect(() => {
    setOneFilmItem(props.getFilmsList[Math.floor(Math.random() * 4) + 0])
    setFilms(props.getFilmsList)
  }, [props.getFilmsList, props])

  const LoadingMenu = () => {
    if (oneFilmItem) {
      return setTimeout(() => {
        setLoading(false)
      }, 3000)
    } else {
      return (
        <div className='sweet-loading'>
          <input
            value={color}
            hidden
            onChange={(input) => setColor(input.target.value)}
          />
          <ClipLoader
            color={color}
            loading={loading}
            css={override}
            size={50}
          />
        </div>
      )
    }
  }
  return (
    <div>
      {loading ? (
        LoadingMenu()
      ) : (
        <>
          <div
            className='header__banner'
            style={{
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundImage: `linear-gradient(rgba(16, 29, 44, 0.43), rgba(16, 29, 44, 0.43)),url(${APIBASEURL}film/photo/${oneFilmItem._id})`,
            }}>
            <div className='header__banner-content'>
              <h2 style={{ color: "white" }}>NOW SHOWING</h2>
              <h2 className='heading__name'>{oneFilmItem.name}</h2>
              <p className='heading__description'>{oneFilmItem.description}</p>
              <h2 style={{ color: "white", fontSize: "1rem" }}>
                In{" "}
                <Moment format='YYYY/MM/DD'>{oneFilmItem.releasedDate}</Moment>
                ,Directored by {oneFilmItem.director}.Main Actor is{" "}
                {oneFilmItem.mainActor} and Second Actor is{" "}
                {oneFilmItem.secondActor}
              </h2>
              <button
                type='submit'
                className='btn btn-white custom__button pl-2 pr-2 mb-3'>
                Place your Seat
              </button>
            </div>
            <div className='header__banner-fadebottom'></div>
          </div>

          <h2 className='film__list'>COMING SOON</h2>
          <div className='row__posters'>
            {films &&
              films.map((item, i) => (
                <div className='image__container' key={i}>
                  <img
                    src={`${APIBASEURL}film/photo/${item._id}`}
                    alt={item.name}
                    className='row__poster'></img>
                  <div className='middle'>
                    <div className='text'>See Trailer</div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  )
}
const mapStateToProps = ({ film }) => ({
  getFilmsList: film.getFilms,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getFilms: () => dispatch(getFilms()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
