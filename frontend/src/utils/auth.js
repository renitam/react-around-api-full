// Register user and return email and owner ID
const baseUrl= 'http://localhost:3000' 

function checkServerCode(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`Error: server code`)
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
}