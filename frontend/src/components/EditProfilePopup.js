import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext)
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    setName(currentUser.name || '')
    setDescription(currentUser.about || '')
  }, [currentUser, isOpen])

  function handleChange(e) {
    const { name, value } = e.target
    name === "name" ? setName(value) : setDescription(value)
  }

  function handleSubmit(e) {
    // Prevent the browser from navigating to the form address
    e.preventDefault()
  
    // Pass the values of the managed components to the external handler
    onUpdateUser({
      name,
      about: description,
    })
  } 

  return(
    <PopupWithForm isOpen={isOpen} name='profile' title='Edit profile' onClose={onClose} onSubmit={handleSubmit}>
      <input
        type='text'
        name='name'
        id='name'
        value={name}
        onChange={handleChange}
        className='modal__input'
        minLength='2'
        maxLength='40'
        required
      />
      <span className='modal__input-error modal__input-error_name'></span>
      <input
        type='text'
        name='about'
        id='about'
        value={description}
        onChange={handleChange}
        className='modal__input'
        minLength='2'
        maxLength='200'
        required
      />
      <span className='modal__input-error modal__input-error_about'></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup