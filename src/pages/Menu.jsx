import { useEffect, useState } from 'react'
import { getMenuItemsByCategory } from '../services/menuService.js'
import { useCart } from '../context/CartContext.jsx'

const CATEGORY_ORDER = ['Starters', 'Flatbread', 'Mains', 'Dessert']

export default function Menu() {
  const [grouped, setGrouped] = useState({})
  const { addItem } = useCart()   // <-- moved here, above return

  useEffect(() => {
    getMenuItemsByCategory().then(setGrouped)
  }, [])

  return (
    <div className="container py-5">
      <h1 className="mb-5">Our Menu</h1>
      {CATEGORY_ORDER.map((category) => {
        const items = grouped[category]
        if (!items) return null

        return (
          <div key={category} className="mb-5">
            <h2 className="border-bottom pb-2 mb-4">{category}</h2>
            <div className="row g-4">
              {items.map((item) => (
                <div className="col-md-4" key={item.id}>
                  <div className="card h-100">
                    <img src={item.image} className="card-img-top" alt={item.name} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="fw-bold">${item.price.toFixed(2)}</p>
                      <button className="btn btn-primary mt-auto" onClick={() => addItem(item)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}