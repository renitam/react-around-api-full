import React from 'react'
import logo from '../images/logo.svg'
import { Route, Link } from 'react-router-dom'

function Header(props) {
  const { onSignOut, email } = props
  const [showHeader, setShowHeader] = React.useState(false)


  const toggleMenu = () => {
    setShowHeader(!showHeader)
  }

  const signOut = () => {
    toggleMenu()
    onSignOut()
  }

  return (
    <header className='header'> 
      {/* Mobile menu bar */}
      <div className={showHeader ? "header__mobile" : "header__mobile header__mobile_hide"}>
        <p className='header__email header__email_mobile'>{email}</p>
        <Link className='header__action header__action_dim header__action_mobile' to='/signin' onClick={signOut}>Log out</Link>
      </div>

      <img 
        src={logo} 
        alt='Around subscript the US'
        className='header__logo' 
      />
      <div className='header__menu'>   
        <Route exact path='/'>
            {email && <p className='header__email'>{email}</p>}
            <Link className='header__action header__action_dim' to='/signin'>Sign out</Link>
            <div className={showHeader ? 'header__close link' : 'header__hamburger link'} onClick={toggleMenu} />
        </Route>
        <Route path='/signin'>
          <Link className='header__action header__action_login link' to='/signup'>Sign up</Link>
        </Route>
        <Route path='/signup'>
          <Link className='header__action header__action_login link' to='/signin'>Log in</Link>
        </Route>
      </div>
    </header>
  )
}

export default Header