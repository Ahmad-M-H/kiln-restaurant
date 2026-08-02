import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Log in</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} style={{ maxWidth: '450px' }}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="form-control"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Log in</button>
      </form>

      <p className="mt-3">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  )
}