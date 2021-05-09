import "./App.css"
import Home from "./components/core/home"
import SignIn from "./components/core/signIn"
import SignUp from "./components/core/signUp"
import NavBar from "./components/navbar/navbar"
import { ToastContainer } from "react-toastify"
import { Switch, Route } from "react-router-dom"
import AdminRoute from "./components/authRoute/adminRoute"
import AdminDashboard from "./components/user/adminDashboard"
import PrivateRoute from "./components/authRoute/privateRoute"
import UserDashboard from "./components/user/userDashboard"

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar/>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/sign-in' component={SignIn} />
        <Route exact path='/sign-up' component={SignUp} />
        <PrivateRoute exact path='/dashboard' component={UserDashboard} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />

      </Switch>
    </>
  )
}

export default App
