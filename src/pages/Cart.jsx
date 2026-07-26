import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart()

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

      <div className="d-flex justify-content-end">
        <h4>Total: ${total.toFixed(2)}</h4>
      </div>
    </div>
  )
}