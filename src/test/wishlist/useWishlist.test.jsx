import {
  renderHook,
  waitFor,
} from '@testing-library/react'

import useWishlist from '../../hooks/useWishlist'

import useAxiosSecure from '../../hooks/useAxiosSecure'

import useAuth from '../../hooks/useAuth'


vi.mock('../../hooks/useAxiosSecure', () => ({
  default: vi.fn(),
}))


vi.mock('../../hooks/useAuth', () => ({
  default: vi.fn(),
}))


const wishlistItem = {
  _id: 'wish-1',
  productId: 'product-1',
  title: 'Premium Shirt',
  image: 'shirt.jpg',
  price: 1500,
}


let mockAxios
let consoleErrorSpy


beforeEach(() => {
  vi.clearAllMocks()

  consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {})

  mockAxios = {
    get: vi.fn(),
  }

  useAxiosSecure.mockReturnValue(
    mockAxios
  )
})


afterEach(() => {
  consoleErrorSpy.mockRestore()
})


// TC-WISH-006
test('returns empty wishlist for guest user without calling wishlist API', async () => {
  useAuth.mockReturnValue({
    user: null,
    loading: false,
  })

  const { result } =
    renderHook(() =>
      useWishlist()
    )

  await waitFor(() => {
    expect(
      result.current.loading
    ).toBe(false)
  })

  expect(
    result.current.wishlist
  ).toEqual([])

  expect(
    mockAxios.get
  ).not.toHaveBeenCalled()
})


// TC-WISH-007
test('loads wishlist successfully for logged in user', async () => {
  useAuth.mockReturnValue({
    user: {
      email:
        'customer@example.com',
    },
    loading: false,
  })

  mockAxios.get.mockResolvedValueOnce({
    data: [
      wishlistItem,
    ],
  })

  const { result } =
    renderHook(() =>
      useWishlist()
    )

  await waitFor(() => {
    expect(
      result.current.loading
    ).toBe(false)
  })

  expect(
    mockAxios.get
  ).toHaveBeenCalledWith(
    '/wishlist'
  )

  expect(
    result.current.wishlist
  ).toEqual([
    wishlistItem,
  ])
})


// TC-WISH-008
test('returns empty wishlist when wishlist API request fails', async () => {
  useAuth.mockReturnValue({
    user: {
      email:
        'customer@example.com',
    },
    loading: false,
  })

  mockAxios.get.mockRejectedValueOnce(
    new Error(
      'Wishlist request failed'
    )
  )

  const { result } =
    renderHook(() =>
      useWishlist()
    )

  await waitFor(() => {
    expect(
      result.current.loading
    ).toBe(false)
  })

  expect(
    mockAxios.get
  ).toHaveBeenCalledWith(
    '/wishlist'
  )

  expect(
    result.current.wishlist
  ).toEqual([])
})