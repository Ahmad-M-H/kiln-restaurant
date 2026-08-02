import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await signup(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Create an account</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} style={{ maxWidth: '450px' }}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="form-control"
            value={form.name}
            onChange={handleChange}
          />
        </div>

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
            minLength={6}
            className="form-control"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Sign up</button>
      </form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  )
}