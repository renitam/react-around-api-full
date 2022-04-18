import Popup from "./Popup"

function PopupWithForm (props) {
  const { isOpen, name, title, onClose, buttonText = 'Save', onSubmit, children } = props

  return(
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <form className={`modal__form modal__form_type_${name}`} name={name} onSubmit={onSubmit}>
        <h2 className='modal__title'>{title}</h2>
        {children}
        <button type='submit' className='modal__save'>{buttonText}</button>
      </form>
    </Popup>
  )
} 

export default PopupWithForm