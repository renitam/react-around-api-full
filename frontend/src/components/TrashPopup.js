import PopupWithForm from "./PopupWithForm"

function TrashPopup({ isOpen, onClose, onUpdateTrash }) {
  
  function handleSubmit(e) {
    e.preventDefault()
    onUpdateTrash()
  }

  return(
    <PopupWithForm isOpen={isOpen} name='trash' title='Are you sure?' onClose={onClose} buttonText='Yes' onSubmit={handleSubmit}/>
  )
}

export default TrashPopup