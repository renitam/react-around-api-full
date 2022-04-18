class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._groupID = options.groupID
    this._authToken = options.authToken
  }

  _checkServerCode(res) {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Error: ${res.status}`)
  }

  // 1 Load user info from server
  getProfileInfo() {
    return fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      headers: {
        authorization: this._authToken
      }
    })
      .then(res => this._checkServerCode(res))
  }

  // 2 Load cards from server
  getCards() {
    return fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      headers: {
        authorization: this._authToken
      }
    })
      .then(res => this._checkServerCode(res))
  }

  // 3 Edit profile info
  saveProfile({ name, about }) {
    return fetch(`${this._baseUrl}/${this._groupID}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._checkServerCode(res))
  }

  // 9 Update profile pic in server
  saveAvatar(link) {
    return fetch(`${this._baseUrl}/${this._groupID}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => this._checkServerCode(res))
  }

  // 4 Add new card to server
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._checkServerCode(res))
  }

  // 7 Delete card from server
  trashCard(cardId) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken
      }
    })
      .then(res => this._checkServerCode(res))
  }

  // 8A Add like to card
  addLike(cardId) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkServerCode(res))
  }

  // 8B Remove like from card
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/${this._groupID}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkServerCode(res))
  }

  // Check user's card like status and toggle
  changeLikeCardStatus(cardId, isNotLiked) {
    if (isNotLiked) {
      return this.addLike(cardId)
    } else {
      return this.removeLike(cardId)
    }
  }
}

const api = new Api({baseUrl: 'https://around.nomoreparties.co/v1', groupID: 'group-11', authToken: 'dd03cd11-47a0-450d-9165-34e32dd702c6'})

export default api