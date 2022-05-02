// Register user and return email and owner ID
const baseUrl= 'https://api.renita.students.nomoreparties.sbs' 

function checkServerCode(res) {
  if (res.ok) {
    return res.json()
  }
}

// Register user, return id & email for sign-in and loading page
export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => checkServerCode(res))
    .catch(err => err)
}

// Log in with email password, return auth token
export const login = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => checkServerCode(res))
    .catch(err => err)
}

// Check login token upon visiting page and return id & email for loading page
export const checkToken = (token, id) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    params: {
      _id: id
    }
  })
    .then(res => checkServerCode(res))
    .catch(err => err)
}