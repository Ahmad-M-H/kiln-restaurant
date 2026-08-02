import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)
const API_URL = 'https://kiln-backend-production.up.railway.app'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  async function signup(name, email, password) {
    const res = await axios.post(`${API_URL}/api/signup`, { name, email, password })
    saveSession(res.data.token, res.data.user)
  }

  async function login(email, password) {
    const res = await axios.post(`${API_URL}/api/login`, { email, password })
    saveSession(res.data.token, res.data.user)
  }

  function saveSession(newToken, newUser) {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const value = { user, token, signup, login, logout, isLoggedIn: !!token }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}