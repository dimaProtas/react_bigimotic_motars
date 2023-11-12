import React from 'react'
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
// import Navbar from './components/Navbar/Navbar';
// import News from './components/News/News';
// import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import { Route, Routes } from "react-router-dom"
import Login from './components/LoginForm/LoginForm.jsx';
import Register from './components/RegisterForm/RegisterForm.jsx';
import { connect } from 'react-redux';
import { compose } from "redux";
import Preloader from './components/Common/Preloader/Preloader';
import { initializedApp } from './reducer/app-reduser.js';
import withSuspense from './hoc/withSuspence'


// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import ProfileComponent from './components/Profile/ProfileComponent';
// import UsersContainer from './components/Users/UsersContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const ProfileComponent = React.lazy(() => import('./components/Profile/ProfileComponent'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))
const FriendsContainer = React.lazy(() => import('./components/Friends/FriendsContainer'))
const NavbarContainer = React.lazy(() => import('./components/Navbar/NavbarContainer'))
const NewsContainer = React.lazy(() => import('./components/News/NewsContainer'))
const MusicContainer = React.lazy(() => import('./components/Music/MusicContainer'))


class App extends React.Component {

  componentDidMount() {
    this.props.initializedApp()
  }

  render() {

    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        {withSuspense(NavbarContainer)}
        <Routes>
          <Route
            path="/profile/:userId?"
            element={withSuspense(ProfileComponent)}
          />
          <Route path="/dialogs/" element={withSuspense(DialogsContainer)} />
          <Route path="/dialogs/:id" element={withSuspense(DialogsContainer)} />
          <Route path="/news" element={withSuspense(NewsContainer)} />
          <Route path="/music" element={withSuspense(MusicContainer)} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/users" element={withSuspense(UsersContainer)} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/friends" element={withSuspense(FriendsContainer)} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  connect(mapStateToProps, { initializedApp }),
)(App)
