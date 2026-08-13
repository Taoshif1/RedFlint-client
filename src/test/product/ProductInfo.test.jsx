import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ProductInfo from '../../components/product/ProductInfo'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import useCart from '../../hooks/useCart'
import useWishlist from '../../hooks/useWishlist'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'


vi.mock('../../hooks/useAxiosSecure', () => ({
  default: vi.fn(),
}))

vi.mock('../../hooks/useCart', () => ({
  default: vi.fn(),
}))

vi.mock('../../hooks/useWishlist', () => ({
  default: vi.fn(),
}))

vi.mock('../../hooks/useAuth', () => ({
  default: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')

  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})


const baseProduct = {
  _id: 'product-1',
  title: 'Premium Shirt',
  images: ['shirt-front.jpg'],
  price: 1500,
  offerPrice: 1200,
  season: 'Summer',
  category: 'Shirt',
  isSpecial: false,
  totalStock: 3,
  sizes: [
    { size: 'M', stock: 3 },
    { size: 'L', stock: 2 },
  ],
}


let mockAddItem
let mockNavigate
let mockAxios
let mockRefetchWishlist


beforeEach(() => {
  vi.clearAllMocks()

  mockAddItem = vi.fn().mockResolvedValue({})
  mockNavigate = vi.fn()

  mockAxios = {
    post: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  }

  mockRefetchWishlist = vi.fn().mockResolvedValue({})

  useAxiosSecure.mockReturnValue(mockAxios)

  useCart.mockReturnValue({
    addItem: mockAddItem,
  })

  useWishlist.mockReturnValue({
    wishlist: [],
    refetch: mockRefetchWishlist,
  })

  useAuth.mockReturnValue({
    user: { email: 'customer@example.com' },
  })

  useNavigate.mockReturnValue(mockNavigate)
})


// TC-PROD-028
test('displays product title, offer price and original price', () => {
  render(<ProductInfo product={baseProduct} />)

  expect(
    screen.getByRole('heading', { name: 'Premium Shirt' })
  ).toBeInTheDocument()

  expect(screen.getByText('৳1200')).toBeInTheDocument()
  expect(screen.getByText('৳1500')).toBeInTheDocument()
})


// TC-PROD-029
test('displays regular price when there is no offer price', () => {
  const product = {
    ...baseProduct,
    offerPrice: null,
  }

  render(<ProductInfo product={product} />)

  expect(screen.getByText('৳1500')).toBeInTheDocument()
  expect(screen.queryByText('৳1200')).not.toBeInTheDocument()
})


// TC-PROD-030
test('disables purchase buttons when product is completely out of stock', () => {
  const product = {
    ...baseProduct,
    totalStock: 0,
    sizes: [
      { size: 'M', stock: 0 },
      { size: 'L', stock: 0 },
    ],
  }

  render(<ProductInfo product={product} />)

  const buttons = screen.getAllByRole('button', {
    name: 'Out of Stock',
  })

  expect(buttons).toHaveLength(2)
  expect(buttons[0]).toBeDisabled()
  expect(buttons[1]).toBeDisabled()
})


// TC-PROD-031
test('adds correct product information to the cart', async () => {
  render(<ProductInfo product={baseProduct} />)

  await userEvent.click(
    screen.getByRole('button', { name: 'Add to Cart' })
  )

  await waitFor(() => {
    expect(mockAddItem).toHaveBeenCalledWith({
      productId: 'product-1',
      title: 'Premium Shirt',
      image: 'shirt-front.jpg',
      price: 1500,
      offerPrice: 1200,
      size: 'M',
      quantity: 1,
    })
  })

  expect(toast.success).toHaveBeenCalledWith('Added to cart')
})


// TC-PROD-032
test('sends the correct product to checkout when Buy Now is clicked', async () => {
  render(<ProductInfo product={baseProduct} />)

  await userEvent.click(
    screen.getByRole('button', { name: 'Buy Now' })
  )

  expect(mockNavigate).toHaveBeenCalledWith('/checkout', {
    state: {
      buyNowItem: {
        productId: 'product-1',
        title: 'Premium Shirt',
        image: 'shirt-front.jpg',
        price: 1500,
        offerPrice: 1200,
        size: 'M',
        quantity: 1,
      },
    },
  })
})


// TC-PROD-033
test('prevents a guest user from using wishlist', async () => {
  useAuth.mockReturnValue({
    user: null,
  })

  render(<ProductInfo product={baseProduct} />)

  await userEvent.click(
    screen.getByRole('button', { name: /Add to Wishlist/i })
  )

  expect(toast.error).toHaveBeenCalledWith(
    'Please login to use wishlist'
  )

  expect(mockAxios.post).not.toHaveBeenCalled()
})


// TC-PROD-034
test('adds product to wishlist for a logged-in user', async () => {
  render(<ProductInfo product={baseProduct} />)

  await userEvent.click(
    screen.getByRole('button', { name: /Add to Wishlist/i })
  )

  await waitFor(() => {
    expect(mockAxios.post).toHaveBeenCalledWith('/wishlist', {
      productId: 'product-1',
      title: 'Premium Shirt',
      image: 'shirt-front.jpg',
      price: 1200,
    })
  })

  expect(toast.success).toHaveBeenCalledWith(
    'Added to wishlist'
  )

  expect(mockRefetchWishlist).toHaveBeenCalled()
})


// TC-PROD-035
test('removes an already wishlisted product', async () => {
  useWishlist.mockReturnValue({
    wishlist: [
      {
        _id: 'wishlist-1',
        productId: 'product-1',
      },
    ],
    refetch: mockRefetchWishlist,
  })

  render(<ProductInfo product={baseProduct} />)

  await userEvent.click(
    screen.getByRole('button', {
      name: /Remove from Wishlist/i,
    })
  )

  await waitFor(() => {
    expect(mockAxios.delete).toHaveBeenCalledWith(
      '/wishlist/wishlist-1'
    )
  })

  expect(toast.success).toHaveBeenCalledWith(
    'Removed from wishlist'
  )

  expect(mockRefetchWishlist).toHaveBeenCalled()
})


// TC-PROD-036
test('does not add an out-of-stock selected size to cart', async () => {
  const product = {
    ...baseProduct,
    sizes: [
      { size: 'M', stock: 0 },
      { size: 'L', stock: 2 },
    ],
  }

  render(<ProductInfo product={product} />)

  await userEvent.click(
    screen.getByRole('button', { name: 'Add to Cart' })
  )

  expect(toast.error).toHaveBeenCalledWith(
    'This size is out of stock'
  )

  expect(mockAddItem).not.toHaveBeenCalled()
})


// TC-PROD-037
test('does not add quantity greater than available stock to cart', async () => {
  const product = {
    ...baseProduct,
    sizes: [
      { size: 'M', stock: 2 },
    ],
  }

  render(<ProductInfo product={product} />)

  const plusButton = screen.getByRole('button', { name: '+' })

  await userEvent.click(plusButton)
  await userEvent.click(plusButton)

  await userEvent.click(
    screen.getByRole('button', { name: 'Add to Cart' })
  )

  expect(toast.error).toHaveBeenCalledWith(
    'Only 2 pieces available'
  )

  expect(mockAddItem).not.toHaveBeenCalled()
})


// TC-PROD-038
test('uses refreshed size stock when a selected size sells out', () => {
  const { rerender } = render(
    <ProductInfo
      product={{
        ...baseProduct,
        totalStock: 1,
        sizes: [{ size: 'M', stock: 1 }],
      }}
    />
  )

  expect(screen.getByText('1 pieces available')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'M' })).toBeEnabled()

  rerender(
    <ProductInfo
      product={{
        ...baseProduct,
        totalStock: 0,
        sizes: [{ size: 'M', stock: 0 }],
      }}
    />
  )

  expect(screen.getByText('0 pieces available')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'M' })).toBeDisabled()
  expect(screen.getAllByRole('button', { name: 'Out of Stock' })).toHaveLength(2)
})
