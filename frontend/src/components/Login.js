import React from 'react'
import AuthForm from './AuthForm'

function Login({ onLogin, email }) {

  return(
    <AuthForm 
      title='Log in' 
      onSubmit={onLogin} 
      initialEmail={email} 
      footer='Not a member yet? Sign up here!'
      footerPath='/signup'
    />
  )
}

export default Login