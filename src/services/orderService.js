import axios from 'axios'

const API_URL = 'https://kiln-backend-production.up.railway.app'

// Sends the current cart items to the backend, authenticated with the
// logged-in user's token, and creates a real order in the database.
export function placeOrder(items, token) {
  return axios
    .post(
      `${API_URL}/api/orders`,
      { items },
      { headers: { Authorization: `Bearer ${token}` } },
    )
    .then((res) => res.data)
}