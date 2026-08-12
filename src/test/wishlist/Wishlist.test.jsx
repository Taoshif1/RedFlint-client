import {
  render,
  screen,
  waitFor,
} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import {
  MemoryRouter,
} from 'react-router'

import Wishlist from '../../components/dashboard/customer/Wishlist'

import useWishlist from '../../hooks/useWishlist'

import useAxiosSecure from '../../hooks/useAxiosSecure'

import toast from 'react-hot-toast'


vi.mock('../../hooks/useWishlist', () => ({
  default: vi.fn(),
}))


vi.mock('../../hooks/useAxiosSecure', () => ({
  default: vi.fn(),
}))


vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))


const wishlistItem = {
  _id: 'wish-1',
  productId: 'product-1',
  title: 'Premium Shirt',
  image: 'shirt.jpg',
  price: 1500,
}


let mockAxios
let mockRefetch
let consoleErrorSpy


beforeEach(() => {
  vi.clearAllMocks()

  consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {})

  mockRefetch =
    vi.fn().mockResolvedValue({})

  mockAxios = {
    delete: vi.fn().mockResolvedValue({
      data: {
        deletedCount: 1,
      },
    }),
  }

  useAxiosSecure.mockReturnValue(
    mockAxios
  )

  useWishlist.mockReturnValue({
    wishlist: [
      wishlistItem,
    ],
    loading: false,
    refetch: mockRefetch,
  })
})


afterEach(() => {
  consoleErrorSpy.mockRestore()
})


const renderWishlist = () => {
  return render(
    <MemoryRouter>
      <Wishlist />
    </MemoryRouter>
  )
}


// TC-WISH-001
test('shows loading spinner while wishlist is loading', () => {
  useWishlist.mockReturnValue({
    wishlist: [],
    loading: true,
    refetch: mockRefetch,
  })

  const { container } =
    renderWishlist()

  expect(
    container.querySelector(
      '.loading-spinner'
    )
  ).toBeInTheDocument()
})


// TC-WISH-002
test('shows empty wishlist message when wishlist has no items', () => {
  useWishlist.mockReturnValue({
    wishlist: [],
    loading: false,
    refetch: mockRefetch,
  })

  renderWishlist()

  expect(
    screen.getByText(
      'Your wishlist is empty.'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText('0')
  ).toBeInTheDocument()
})


// TC-WISH-003
test('displays wishlist product information and product link correctly', () => {
  renderWishlist()

  expect(
    screen.getByText(
      'Premium Shirt'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      '৳1500'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText('1')
  ).toBeInTheDocument()

  expect(
    screen.getByRole(
      'img',
      {
        name: 'Premium Shirt',
      }
    )
  ).toHaveAttribute(
    'src',
    'shirt.jpg'
  )

  expect(
    screen.getByRole(
      'link',
      {
        name: 'View Product',
      }
    )
  ).toHaveAttribute(
    'href',
    '/products/product-1'
  )
})


// TC-WISH-004
test('removes wishlist item successfully and refreshes wishlist', async () => {
  const user = userEvent.setup()

  renderWishlist()

  await user.click(
    screen.getByRole(
      'button',
      {
        name: 'Remove',
      }
    )
  )

  await waitFor(() => {
    expect(
      mockAxios.delete
    ).toHaveBeenCalledWith(
      '/wishlist/wish-1'
    )
  })

  expect(
    mockRefetch
  ).toHaveBeenCalledTimes(1)

  expect(
    toast.success
  ).toHaveBeenCalledWith(
    'Removed from wishlist'
  )
})


// TC-WISH-005
test('shows error message when wishlist item removal fails', async () => {
  const user = userEvent.setup()

  mockAxios.delete.mockRejectedValueOnce(
    new Error('Delete failed')
  )

  renderWishlist()

  await user.click(
    screen.getByRole(
      'button',
      {
        name: 'Remove',
      }
    )
  )

  await waitFor(() => {
    expect(
      toast.error
    ).toHaveBeenCalledWith(
      'Failed to remove wishlist item'
    )
  })

  expect(
    mockRefetch
  ).not.toHaveBeenCalled()
})