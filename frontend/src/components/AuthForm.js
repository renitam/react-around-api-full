import React from 'react'
import { Link } from 'react-router-dom'

const Flow = (props) => {
  const { 
    title, 
    onSubmit, 
    initialEmail, 
    footer, 
    footerPath 
  } = props
  
  const [email, setEmail] = React.useState(initialEmail)
  const [password, setPassword] = React.useState('')
  const [hide, setHide] = React.useState(true)
  const [icon, setIcon] = React.useState('fa-solid fa-eye')

  function handleChange(e) {
    const { name, value } = e.target
    name === "email" ? setEmail(value) : setPassword(value)
  }

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault()
    // Pass the values of the managed components to the external handler
    onSubmit(email, password)
  } 

  function handleEye() {
    setHide(!hide)
    if (icon === 'fa-solid fa-eye') {
      setIcon('fa-solid fa-eye-slash')
    } else {
      setIcon('fa-solid fa-eye')
    }
  }


  return (
    <main className='auth'>
      <form className='auth__form' name='auth' onSubmit={handleSubmit}>
        <h2 className='auth__title'>{title}</h2>
        <input
          type='text'
          name='email'
          id='email'
          placeholder='Email'
          value={email}
          onChange={handleChange}
          className='auth__input'
          minLength='3'
          maxLength='256'
          required
        />
        <span className='auth__input-error auth__input-error_email'></span>
        <input
          type={hide ? 'password' : 'text'}
          name='password'
          id='password'
          placeholder='Password'
          value={password}
          onChange={handleChange}
          className='auth__input'
          minLength='8'
          maxLength='16'
          required
        />
        <i className={`${icon} auth__eye link`} onClick={handleEye} />
        <span className='auth__input-error auth__input-error_pass'></span>
        <button type='submit' className='auth__save'>{title}</button>
        <Link className='auth__footer link' to={footerPath}>{footer}</Link>
      </form>
    </main>
  )
}

export default Flow