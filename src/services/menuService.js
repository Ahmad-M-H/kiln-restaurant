import axios from 'axios'

const API_URL = 'https://kiln-backend-production.up.railway.app'

export function getMenuItems() {
  return axios.get(`${API_URL}/api/menu`).then((res) =>
    res.data.map((item) => ({
      ...item,
      price: parseFloat(item.price),
    }))
  )
}

export function getMenuItemsByCategory() {
  return getMenuItems().then((items) => {
    const grouped = {}
    for (const item of items) {
      if (!grouped[item.category]) grouped[item.category] = []
      grouped[item.category].push(item)
    }
    return grouped
  })
}