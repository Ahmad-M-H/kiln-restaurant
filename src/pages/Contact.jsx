import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="container py-5 text-center">
        <h1>Message sent</h1>
        <p className="text-muted">We'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
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
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="form-control"
            value={form.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Send message</button>
      </form>
    </div>
  )
}