import {
  renderHook,
  waitFor,
} from '@testing-library/react'

import useOrders from '../../hooks/useOrders'

import useAuth from '../../hooks/useAuth'

import useAxiosSecure from '../../hooks/useAxiosSecure'


vi.mock('../../hooks/useAuth', () => ({
  default: vi.fn(),
}))


vi.mock('../../hooks/useAxiosSecure', () => ({
  default: vi.fn(),
}))


const sampleOrder = {
  _id:
    '68abc123def4567890abcd12',

  orderNumber:
    'RF-20260812-ORDER1',

  orderStatus:
    'Pending',

  total: 3120,
}


let mockAxios
let consoleErrorSpy


beforeEach(() => {
  vi.clearAllMocks()

  consoleErrorSpy = vi
    .spyOn(
      console,
      'error'
    )
    .mockImplementation(
      () => {}
    )

  mockAxios = {
    get: vi.fn(),
  }

  useAxiosSecure.mockReturnValue(
    mockAxios
  )

  useAuth.mockReturnValue({
    user: {
      email:
        'customer@example.com',
    },

    loading: false,
  })
})


afterEach(() => {
  consoleErrorSpy.mockRestore()
})


// TC-ORDER-004
test('loads customer orders successfully for logged in user', async () => {
  mockAxios.get.mockResolvedValueOnce({
    data: [
      sampleOrder,
    ],
  })

  const {
    result,
  } = renderHook(
    () => useOrders()
  )

  await waitFor(() => {
    expect(
      result.current.loading
    ).toBe(false)
  })

  expect(
    mockAxios.get
  ).toHaveBeenCalledWith(
    '/orders'
  )

  expect(
    result.current.orders
  ).toEqual([
    sampleOrder,
  ])
})


// TC-ORDER-005
test('returns empty order list when orders API request fails', async () => {
  mockAxios.get.mockRejectedValueOnce(
    new Error(
      'Orders request failed'
    )
  )

  const {
    result,
  } = renderHook(
    () => useOrders()
  )

  await waitFor(() => {
    expect(
      result.current.loading
    ).toBe(false)
  })

  expect(
    mockAxios.get
  ).toHaveBeenCalledWith(
    '/orders'
  )

  expect(
    result.current.orders
  ).toEqual([])
})