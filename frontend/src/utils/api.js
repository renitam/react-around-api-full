class Api {
  constructor() {
    this._baseUrl = 'http://localhost:3000'
    this._authToken = `Bearer ${localStorage.getItem('token')}`
    this._contentType = 'application/json'
    this._headers = {
      'Authorization': this._authToken,
      'Content-Type': this._contentType,
    }
  }

  updateAuthToken(token) {
    console.log(token, this._authToken)
    this._authToken = `Bearer ${token}`
    console.log(token, this._authToken)
  }

  _checkServerCode(res) {
    if (res.ok) {
      return res.json()
    }

    return Promise.reject(`Error: ${res.status}`)
  }

  // 1 Load user info from server
  getProfileInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => this._checkServerCode(res))
  }

  // 2 Load cards from server
  getCards() {
    console.log(this._headers)
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => this._checkServerCode(res))
  }

  // 3 Edit profile info
  saveProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._checkServerCode(res))
  }

  // 9 Update profile pic in server
  saveAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => this._checkServerCode(res))
  }

  // 4 Add new card to server
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._checkServerCode(res))
  }

  // 7 Delete card from server
  trashCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkServerCode(res))
  }

  // 8A Add like to card
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then(res => this._checkServerCode(res))
  }

  // 8B Remove like from card
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
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

const api = new Api()

export default api