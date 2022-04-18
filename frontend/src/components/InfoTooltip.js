import React from 'react'
import Popup from './Popup'

const InfoTooltip = (props) => {
  const { isOpen, status, onClose } = props

  return(
    <Popup name='info' isOpen={isOpen} onClose={onClose}>
      <div className='info'>
        <img src={status.image} alt={status.alt} className='info__image' /> 
        <p className='info__text'>{status.status}</p>
      </div>
    </Popup>
        
  )
}

export default InfoTooltip