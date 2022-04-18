import React from 'react'

function Popup (props) {
  const { name, isOpen, onClose, children } = props

  React.useEffect(() => {
    if (!isOpen) return;

    const closeByEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    const closeByOverlay = (e) => {
      if (e.target.className.search('modal_display') > -1) {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEsc)
    document.addEventListener('click', closeByOverlay)

    return () => {
      document.removeEventListener('keydown', closeByEsc)
      document.removeEventListener('click', closeByOverlay)
    }

  }, [isOpen, onClose])

  return (
    <section className={`modal modal_type_${name} ${isOpen && 'modal_display'}`}>
      <div className={`modal__body modal__body_type_${name}`}>
        <button
          type='button'
          className={`modal__close-btn modal__close-btn_type_${name} link`}
          aria-label={`close ${name} menu`}
          onClick={onClose}
        ></button>
        {children}
      </div>
    </section>
  )
}

export default Popup