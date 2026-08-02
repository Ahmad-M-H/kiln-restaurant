import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  function addItem(menuItem) {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuItemId === menuItem.id)
      if (existing) {
        return prev.map((i) =>
          i.menuItemId === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [
        ...prev,
        {
          menuItemId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
        },
      ]
    })
  }

  function removeItem(menuItemId) {
    setItems((prev) => prev.filter((i) => i.menuItemId !== menuItemId))
  }

  function updateQuantity(menuItemId, quantity) {
    if (quantity <= 0) {
      removeItem(menuItemId)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.menuItemId === menuItemId ? { ...i, quantity } : i))
    )
  }
  function clearCart() {
    setItems([])
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  const value = { items, addItem, removeItem, updateQuantity, clearCart, total, count }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}