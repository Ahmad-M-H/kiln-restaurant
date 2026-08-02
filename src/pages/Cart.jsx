import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { placeOrder } from '../services/orderService.js'

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart()
  const { token, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')

  async function handlePlaceOrder() {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    setError('')
    setPlacing(true)
    try {
      await placeOrder(items, token)
      clearCart()
      navigate('/')
    } catch (err) {
      console.error('Order error:', err)
      setError('Something went wrong placing your order. Please try again.')
    } finally {
      setPlacing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h1>Your cart is empty</h1>
        <p className="text-muted mb-4">Add a few dishes from the menu to get started.</p>
        <Link to="/menu" className="btn btn-primary">
          Browse the menu
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Your Cart</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table align-middle">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.menuItemId}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td style={{ width: '140px' }}>
                <div className="d-flex align-items-center gap-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeItem(item.menuItemId)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-end align-items-center gap-4">
        <h4 className="mb-0">Total: ${total.toFixed(2)}</h4>
        <button
          className="btn btn-primary"
          onClick={handlePlaceOrder}
          disabled={placing}
        >
          {placing ? 'Placing order…' : 'Place order'}
        </button>
      </div>

      {!isLoggedIn && (
        <p className="text-muted text-end mt-2">
          You'll need to log in to complete your order.
        </p>
      )}
    </div>
  )
}