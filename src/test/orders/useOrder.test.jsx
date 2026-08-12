import {
  renderHook,
  waitFor,
} from '@testing-library/react'

import useOrder from '../../hooks/useOrder'

import useAxiosSecure from '../../hooks/useAxiosSecure'


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
})


afterEach(() => {
  consoleErrorSpy.mockRestore()
})


// TC-ORDER-008
test('loads a single customer order using order id', async () => {
  mockAxios.get.mockResolvedValueOnce({
    data:
      sampleOrder,
  })

  const {
    result,
  } = renderHook(
    () =>
      useOrder(
        '68abc123def4567890abcd12'
      )
  )

  await waitFor(() => {
    expect(
      result.current.loading
    ).toBe(false)
  })

  expect(
    mockAxios.get
  ).toHaveBeenCalledWith(
    '/orders/68abc123def4567890abcd12'
  )

  expect(
    result.current.order
  ).toEqual(
    sampleOrder
  )
})