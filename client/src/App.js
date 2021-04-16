import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Signin from './components/Signin'
import Profile from './components/Profile'
import Alert from './components/Alert'
import { GlobalContext } from './context/globalContext'

function App() {
  const global = useContext(GlobalContext)
  return (
    <>
      <Router>
        <Header />
        {global.alert.message && (
          <Alert alert={global.alert} event={global.setAlert} />
        )}
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/profile/:userId' exact component={Profile} />
          <Route path='/signin' exact component={Signin} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}

export default App
