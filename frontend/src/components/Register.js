import AuthForm from "./AuthForm"

const Register = (props) => {
  const { onRegister, email } = props

  return(
    <AuthForm 
      title='Sign up' 
      onSubmit={onRegister} 
      initialEmail={email}
      footer='Already a member? Log in here!'
      footerPath='/signin'
    />
  )
}

export default Register