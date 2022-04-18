import React from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarUrl = React.useRef()

  React.useEffect(() => {
    avatarUrl.current.value = ''
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateAvatar({
      avatar: avatarUrl.current.value,
    })
  }

  return (
    <PopupWithForm isOpen={isOpen} name='avatar' title='Change profile picture' onClose={onClose} onSubmit={handleSubmit}>
      <input
        type='url'
        name='link'
        id='avatar'
        ref={avatarUrl}
        className='modal__input'
        placeholder='Image link'
        minLength='1'
        required
      />
      <span className='modal__input-error modal__input-error_avatar'></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup