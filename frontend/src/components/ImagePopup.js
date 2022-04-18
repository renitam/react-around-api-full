import Popup from "./Popup"

function ImagePopup({ isOpen, onClose, card}) {
  return(
    <Popup name='preview' isOpen={isOpen} onClose={onClose}>
      <img src={card.link} alt={card.name} className='modal__image' />
      <p className='modal__caption'>{card.name}</p>
    </Popup>
  )
}

export default ImagePopup