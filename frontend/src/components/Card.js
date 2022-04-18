import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext) || ''
  const isOwn = card.owner._id === currentUser._id
  const isLiked = card.likes.some(i => i._id === currentUser._id)
  const likeClass = `card__like ${isLiked && 'card__like_active'}`

  function handleClick() {
    onCardClick(card)
  }

  function handleLike() {
    onCardLike(card)
  }

  function handleTrash() {
    onCardDelete(card)
  }
 
  return(
    <article className='card'>
      {isOwn &&
      <button
        type='button'
        className='card__trash link'
        aria-label='trash button'
        onClick={handleTrash}
      ></button>}
      <img 
        src={card.link}  
        alt={`${card.name}`} 
        className='card__image' 
        onClick={handleClick}
      />
      <div className='card__info-wrapper'>
        <h2 className='card__title'>{card.name}</h2>
        <div className='card__like-wrapper'>
          <button
            type='button'
            className={likeClass}
            aria-label='like button'
            onClick={handleLike}
          ></button>
          <p className='card__like-num'>{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card