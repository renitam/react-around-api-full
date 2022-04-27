import React from 'react'
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({ onEditAvatarClick, onEditProfileClick, onAddPlaceClick, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext)

  return(
    <main>
      <section className='profile'>
        <div className='profile__content'>
          <div className='profile__avatar-overlay'>
            <img
              src={currentUser.avatar}
              alt='Profile avatar'
              className='profile__avatar'
              onClick={onEditAvatarClick}
            />
          </div>
          <div className='profile__info'>
            <h1 className='profile__name'>{currentUser.name}</h1>
            <button
              type='button'
              className='profile__edit-btn link'
              aria-label='open edit profile menu'
              onClick={onEditProfileClick}
            ></button>
            <p className='profile__about'>{currentUser.about}</p>
          </div>
        </div>
        <button type='button' className='profile__add-btn link' onClick={onAddPlaceClick}></button>
      </section>

      <section className='cards'>
        {cards.map((card, i) => (
          <Card key={i} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
        ))}
      </section>
    </main>
  )
}

export default Main