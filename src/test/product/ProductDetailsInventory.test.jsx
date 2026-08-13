import { act, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import ProductDetails from '../../pages/ProductDetails'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { invalidateInventory } from '../../utils/inventoryStore'


vi.mock('../../hooks/useAxiosSecure', () => ({
  default: vi.fn(),
}))


vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')

  return {
    ...actual,
    useParams: () => ({ id: 'stone-gray-id' }),
  }
})


vi.mock('../../components/product/ProductGallery', () => ({
  default: () => <div>Product gallery</div>,
}))


vi.mock('../../components/product/ProductInfo', () => ({
  default: ({ product }) => (
    <div>
      <p>Total stock: {product.totalStock}</p>
      <p>M stock: {product.sizes[0].stock}</p>
      <button disabled={product.sizes[0].stock === 0}>M</button>
    </div>
  ),
}))


vi.mock('../../components/product/SizeGuide', () => ({
  default: () => null,
}))


vi.mock('../../components/product/ProductDescription', () => ({
  default: () => null,
}))


vi.mock('../../components/product/ProductReviews', () => ({
  default: () => null,
}))


const productAtStock = (stock) => ({
  _id: 'stone-gray-id',
  title: 'Stone Gray Shirt',
  totalStock: stock,
  sizes: [{ size: 'M', stock }],
  images: [],
})


test('refetches product details after guest and customer stock changes', async () => {
  const mockAxios = {
    get: vi
      .fn()
      .mockResolvedValueOnce({ data: productAtStock(2) })
      .mockResolvedValueOnce({ data: productAtStock(1) })
      .mockResolvedValueOnce({ data: productAtStock(0) }),
  }

  useAxiosSecure.mockReturnValue(mockAxios)

  render(
    <MemoryRouter>
      <ProductDetails />
    </MemoryRouter>
  )

  expect(await screen.findByText('Total stock: 2')).toBeInTheDocument()
  expect(screen.getByText('M stock: 2')).toBeInTheDocument()

  act(() => invalidateInventory())

  expect(await screen.findByText('Total stock: 1')).toBeInTheDocument()
  expect(screen.getByText('M stock: 1')).toBeInTheDocument()

  act(() => invalidateInventory())

  expect(await screen.findByText('Total stock: 0')).toBeInTheDocument()
  expect(screen.getByText('M stock: 0')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'M' })).toBeDisabled()

  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenCalledTimes(3)
  })
})
