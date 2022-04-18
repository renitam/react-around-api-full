import PopupWithForm from "./PopupWithForm"
import React from "react"

function AddPlacePopup({ isOpen, onClose, onUpdateCards }) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  function handleAddCard(e) {
    e.preventDefault()
    onUpdateCards({ name, link })
  }

  function handleChange(e) {
    const {name, value } = e.target
    name === "name" ? setName(value) : setLink(value)
  }

  return(
    <PopupWithForm isOpen={isOpen} name='card' title='New place' onClose={onClose} buttonText='Create' onSubmit={handleAddCard}>
      <input
        type='text'
        name='name'
        id='place'
        value={name}
        onChange={handleChange}
        className='modal__input'
        placeholder='Title'
        minLength='1'
        maxLength='30'
        required
      />
      <span className='modal__input-error modal__input-error_place'></span>
      <input
        type='url'
        name='link'
        id='image'
        value={link}
        onChange={handleChange}
        className='modal__input'
        placeholder='Image link'
        required
      />
      <span className='modal__input-error modal__input-error_image'></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup