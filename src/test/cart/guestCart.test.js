import {
  getGuestCart,
  addGuestCartItem,
  updateGuestCartItem,
  removeGuestCartItem,
  clearGuestCart,
} from '../../utils/guestCart'


const baseItem = {
  productId: 'product-1',
  title: 'Premium Shirt',
  size: 'M',
  quantity: 2,
  offerPrice: 1500,
  image: 'shirt.jpg',
}


beforeEach(() => {
  localStorage.clear()
})


// TC-CART-001
test('returns an empty cart when guest cart does not exist', () => {
  const cart = getGuestCart()

  expect(cart).toEqual([])
})


// TC-CART-002
test('adds a new product to guest cart and stores it in localStorage', () => {
  const cart = addGuestCartItem(baseItem)

  expect(cart).toHaveLength(1)

  expect(cart[0]).toEqual(
    expect.objectContaining({
      productId: 'product-1',
      title: 'Premium Shirt',
      size: 'M',
      quantity: 2,
      _id: 'guest-product-1-M',
      isGuestItem: true,
    })
  )

  const storedCart = JSON.parse(
    localStorage.getItem('redflint_guest_cart')
  )

  expect(storedCart).toHaveLength(1)

  expect(storedCart[0].productId).toBe(
    'product-1'
  )
})


// TC-CART-003
test('increases quantity when same product and same size is added again', () => {
  addGuestCartItem(baseItem)

  const cart = addGuestCartItem({
    ...baseItem,
    quantity: 3,
  })

  expect(cart).toHaveLength(1)

  expect(cart[0].quantity).toBe(5)
})


// TC-CART-004
test('keeps different sizes of the same product as separate cart items', () => {
  addGuestCartItem(baseItem)

  const cart = addGuestCartItem({
    ...baseItem,
    size: 'L',
    quantity: 1,
  })

  expect(cart).toHaveLength(2)

  expect(
    cart.some((item) => item.size === 'M')
  ).toBe(true)

  expect(
    cart.some((item) => item.size === 'L')
  ).toBe(true)
})


// TC-CART-005
test('updates quantity of a guest cart item', () => {
  const addedCart =
    addGuestCartItem(baseItem)

  const itemId = addedCart[0]._id

  const updatedCart =
    updateGuestCartItem(
      itemId,
      5
    )

  expect(updatedCart[0].quantity).toBe(5)

  expect(
    getGuestCart()[0].quantity
  ).toBe(5)
})


// TC-CART-006
test('removes a product from guest cart', () => {
  const addedCart =
    addGuestCartItem(baseItem)

  const itemId = addedCart[0]._id

  const updatedCart =
    removeGuestCartItem(itemId)

  expect(updatedCart).toEqual([])

  expect(getGuestCart()).toEqual([])
})


// TC-CART-007
test('clears the complete guest cart', () => {
  addGuestCartItem(baseItem)

  addGuestCartItem({
    ...baseItem,
    productId: 'product-2',
    size: 'L',
  })

  expect(getGuestCart()).toHaveLength(2)

  clearGuestCart()

  expect(getGuestCart()).toEqual([])

  expect(
    localStorage.getItem(
      'redflint_guest_cart'
    )
  ).toBeNull()
})


// TC-CART-008
test('returns an empty cart when localStorage contains invalid cart data', () => {
  localStorage.setItem(
    'redflint_guest_cart',
    'invalid-json-data'
  )

  const cart = getGuestCart()

  expect(cart).toEqual([])
})


// TC-CART-009
test('converts guest cart quantity to a number when item is added', () => {
  const cart = addGuestCartItem({
    ...baseItem,
    quantity: '4',
  })

  expect(cart[0].quantity).toBe(4)

  expect(
    typeof cart[0].quantity
  ).toBe('number')
})