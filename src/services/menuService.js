import { menuItems } from '../data/menuData.js'

// Phase 1: resolves with local data.
// Phase 2: replace the body with
//   return axios.get('/api/menu').then(res => res.data)
// Because this already returns a Promise, nothing that calls
// getMenuItems() will need to change later.
export function getMenuItems() {
  return Promise.resolve(menuItems)
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