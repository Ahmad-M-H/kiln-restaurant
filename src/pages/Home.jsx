import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMenuItems } from '../services/menuService.js'

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    getMenuItems().then((items) => setFeatured(items.slice(0, 3)))
  }, [])

  return (
    <div>
      {/* Hero */}
      <div className="bg-dark text-light text-center py-5">
        <h1 className="display-4">Everything here has touched an open flame.</h1>
        <p className="lead">
          Kiln is a neighborhood kitchen built around one wood-fired hearth.
        </p>
        <Link to="/menu" className="btn btn-primary btn-lg mt-3">
          View the menu
        </Link>
      </div>

      {/* Featured dishes */}
      <div className="container py-5">
        <h2 className="mb-4">Featured dishes</h2>
        <div className="row g-4">
          {featured.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card h-100">
                <img src={item.image} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="fw-bold">${item.price.toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}