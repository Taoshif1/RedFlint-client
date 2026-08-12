import {
  render,
  screen,
  waitFor,
} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import ShoppingCart from '../../components/shared/ShoppingCart'

import useCart from '../../hooks/useCart'

import {
  useNavigate,
} from 'react-router'

import toast from 'react-hot-toast'


vi.mock('../../hooks/useCart', () => ({
  default: vi.fn(),
}))


vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))


vi.mock('react-router', async () => {
  const actual =
    await vi.importActual('react-router')

  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})


let mockUpdateQuantity
let mockRemoveItem
let mockClearCart
let mockNavigate
let mockOnClose


const cartItem = {
  _id: 'cart-1',
  productId: 'product-1',
  title: 'Premium Shirt',
  size: 'M',
  quantity: 2,
  offerPrice: 1500,
  image: 'shirt.jpg',
}


beforeEach(() => {
  vi.clearAllMocks()

  mockUpdateQuantity =
    vi.fn().mockResolvedValue({})

  mockRemoveItem =
    vi.fn().mockResolvedValue({})

  mockClearCart =
    vi.fn().mockResolvedValue({})

  mockNavigate = vi.fn()

  mockOnClose = vi.fn()

  useCart.mockReturnValue({
    updateQuantity:
      mockUpdateQuantity,

    removeItem:
      mockRemoveItem,

    clearCart:
      mockClearCart,
  })

  useNavigate.mockReturnValue(
    mockNavigate
  )
})


const renderCart = ({
  isOpen = true,
  cartItems = [cartItem],
} = {}) => {
  return render(
    <ShoppingCart
      isOpen={isOpen}
      onClose={mockOnClose}
      cartItems={cartItems}
    />
  )
}


// TC-CART-010
test('does not display shopping cart when cart is closed', () => {
  const { container } =
    renderCart({
      isOpen: false,
    })

  expect(
    container
  ).toBeEmptyDOMElement()
})


// TC-CART-011
test('shows empty cart state when there are no cart items', () => {
  renderCart({
    cartItems: [],
  })

  expect(
    screen.getByText(
      'Your cart is empty.'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByRole(
      'button',
      {
        name:
          'Proceed to Checkout',
      }
    )
  ).toBeDisabled()

  expect(
    screen.getByRole(
      'button',
      {
        name: 'Clear Cart',
      }
    )
  ).toBeDisabled()
})


// TC-CART-012
test('displays cart product information and calculates total correctly', () => {
  renderCart()

  expect(
    screen.getByText(
      'Premium Shirt'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText('Size: M')
  ).toBeInTheDocument()

  expect(
    screen.getByText('৳3,000')
  ).toBeInTheDocument()
})


// TC-CART-013
test('increases product quantity when plus button is clicked', async () => {
  renderCart()

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: '+',
      }
    )
  )

  await waitFor(() => {
    expect(
      mockUpdateQuantity
    ).toHaveBeenCalledWith(
      cartItem,
      3
    )
  })
})


// TC-CART-014
test('decreases product quantity when minus button is clicked', async () => {
  renderCart()

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: '-',
      }
    )
  )

  await waitFor(() => {
    expect(
      mockUpdateQuantity
    ).toHaveBeenCalledWith(
      cartItem,
      1
    )
  })
})


// TC-CART-015
test('removes an item from cart successfully', async () => {
  renderCart()

  const buttons =
    screen.getAllByRole('button')

  const removeButton =
    buttons.find((button) =>
      button.className.includes(
        'text-error'
      )
    )

  await userEvent.click(
    removeButton
  )

  await waitFor(() => {
    expect(
      mockRemoveItem
    ).toHaveBeenCalledWith(
      cartItem
    )
  })

  expect(
    toast.success
  ).toHaveBeenCalledWith(
    'Removed from cart'
  )
})


// TC-CART-016
test('clears all cart items successfully', async () => {
  renderCart()

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: 'Clear Cart',
      }
    )
  )

  await waitFor(() => {
    expect(
      mockClearCart
    ).toHaveBeenCalledTimes(1)
  })

  expect(
    toast.success
  ).toHaveBeenCalledWith(
    'Cart cleared'
  )
})


// TC-CART-017
test('closes cart and navigates to checkout when checkout button is clicked', async () => {
  renderCart()

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name:
          'Proceed to Checkout',
      }
    )
  )

  expect(
    mockOnClose
  ).toHaveBeenCalledTimes(1)

  expect(
    mockNavigate
  ).toHaveBeenCalledWith(
    '/checkout'
  )
})


// TC-CART-018
test('does not decrease product quantity below one', async () => {
  renderCart({
    cartItems: [
      {
        ...cartItem,
        quantity: 1,
      },
    ],
  })

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: '-',
      }
    )
  )

  expect(
    mockUpdateQuantity
  ).not.toHaveBeenCalled()
})


// TC-CART-019
test('calculates total correctly for multiple cart items', () => {
  const secondItem = {
    _id: 'cart-2',
    productId: 'product-2',
    title: 'Classic Polo',
    size: 'L',
    quantity: 3,
    price: 1000,
    image: 'polo.jpg',
  }

  renderCart({
    cartItems: [
      cartItem,
      secondItem,
    ],
  })

  expect(
    screen.getByText('৳6,000')
  ).toBeInTheDocument()
})


// TC-CART-020
test('shows error message when updating quantity fails', async () => {
  mockUpdateQuantity.mockRejectedValueOnce(
    new Error('Update failed')
  )

  renderCart()

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: '+',
      }
    )
  )

  await waitFor(() => {
    expect(
      toast.error
    ).toHaveBeenCalledWith(
      'Failed to update cart'
    )
  })
})


// TC-CART-021
test('shows error message when removing cart item fails', async () => {
  mockRemoveItem.mockRejectedValueOnce(
    new Error('Remove failed')
  )

  renderCart()

  const buttons =
    screen.getAllByRole('button')

  const removeButton =
    buttons.find((button) =>
      button.className.includes(
        'text-error'
      )
    )

  await userEvent.click(
    removeButton
  )

  await waitFor(() => {
    expect(
      toast.error
    ).toHaveBeenCalledWith(
      'Failed to remove item'
    )
  })
})


// TC-CART-022
test('shows error message when clearing cart fails', async () => {
  mockClearCart.mockRejectedValueOnce(
    new Error('Clear failed')
  )

  renderCart()

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: 'Clear Cart',
      }
    )
  )

  await waitFor(() => {
    expect(
      toast.error
    ).toHaveBeenCalledWith(
      'Failed to clear cart'
    )
  })
})