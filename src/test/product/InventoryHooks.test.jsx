import { act, renderHook, waitFor } from '@testing-library/react'

import useAxiosSecure from '../../hooks/useAxiosSecure'
import useFeaturedProducts from '../../hooks/useFeaturedProducts'
import useProducts from '../../hooks/useProducts'
import { invalidateInventory } from '../../utils/inventoryStore'


vi.mock('../../hooks/useAxiosSecure', () => ({
  default: vi.fn(),
}))


const stockResponse = (stock) => ({
  data: [{ _id: 'stone-gray-id', title: 'Stone Gray', totalStock: stock }],
})


beforeEach(() => {
  vi.clearAllMocks()
})


test('refreshes featured product stock after inventory invalidation', async () => {
  const mockAxios = {
    get: vi
      .fn()
      .mockResolvedValueOnce(stockResponse(2))
      .mockResolvedValueOnce(stockResponse(1)),
  }
  useAxiosSecure.mockReturnValue(mockAxios)

  const { result } = renderHook(() => useFeaturedProducts())

  await waitFor(() => {
    expect(result.current.products[0]?.totalStock).toBe(2)
  })

  act(() => invalidateInventory())

  await waitFor(() => {
    expect(result.current.products[0]?.totalStock).toBe(1)
  })

  expect(mockAxios.get).toHaveBeenCalledTimes(2)
})


test('refreshes the shared admin product inventory source', async () => {
  const mockAxios = {
    get: vi
      .fn()
      .mockResolvedValueOnce(stockResponse(1))
      .mockResolvedValueOnce(stockResponse(0)),
  }
  useAxiosSecure.mockReturnValue(mockAxios)

  const { result } = renderHook(() => useProducts())

  await waitFor(() => {
    expect(result.current.products[0]?.totalStock).toBe(1)
  })

  act(() => invalidateInventory())

  await waitFor(() => {
    expect(result.current.products[0]?.totalStock).toBe(0)
  })

  expect(mockAxios.get).toHaveBeenCalledTimes(2)
})
