import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'

import Products from '../../pages/Products'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { invalidateInventory } from '../../utils/inventoryStore'


vi.mock('../../hooks/useAxiosSecure', () => ({
  default: vi.fn(),
}))


vi.mock('../../components/shared/Product', () => ({
  default: ({ product }) => (
    <div data-testid="product-card">
      <span>{product.title}</span>
      <span>stock {product.totalStock}</span>
    </div>
  ),
}))


let mockAxios


beforeEach(() => {
  vi.clearAllMocks()

  mockAxios = {
    get: vi.fn(),
  }

  useAxiosSecure.mockReturnValue(mockAxios)
})


const renderProducts = (url = '/products') => {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Products />
    </MemoryRouter>
  )
}


// TC-SEARCH-004
test('loads and displays products using default search and sorting', async () => {
  mockAxios.get.mockResolvedValueOnce({
    data: [
      {
        _id: 'product-1',
        title: 'Premium Shirt',
      },
    ],
  })

  renderProducts()

  expect(
    await screen.findByText('Premium Shirt')
  ).toBeInTheDocument()

  expect(
    screen.getByRole('heading', {
      name: 'All Products',
    })
  ).toBeInTheDocument()

  expect(
    screen.getByText('1 product found')
  ).toBeInTheDocument()

  expect(mockAxios.get).toHaveBeenCalledWith(
    '/products',
    {
      params: {
        search: '',
        sort: 'newest',
        view: 'card',
      },
      signal: expect.any(AbortSignal),
    }
  )
})


// TC-SEARCH-005
test('loads products using the search query from the URL', async () => {
  mockAxios.get.mockResolvedValueOnce({
    data: [
      {
        _id: 'product-1',
        title: 'Premium Shirt',
      },
    ],
  })

  renderProducts('/products?search=shirt')

  expect(
    await screen.findByText('Premium Shirt')
  ).toBeInTheDocument()

  expect(
    screen.getByRole('heading', {
      name: 'Search results for "shirt"',
    })
  ).toBeInTheDocument()

  expect(mockAxios.get).toHaveBeenCalledWith(
    '/products',
    {
      params: {
        search: 'shirt',
        sort: 'newest',
        view: 'card',
      },
      signal: expect.any(AbortSignal),
    }
  )
})


// TC-SEARCH-006
test('changes the product sorting option correctly', async () => {
  mockAxios.get.mockResolvedValue({
    data: [
      {
        _id: 'product-1',
        title: 'Premium Shirt',
      },
    ],
  })

  renderProducts()

  await screen.findByText('Premium Shirt')

  const sortSelect = screen.getByRole('combobox')

  await userEvent.selectOptions(
    sortSelect,
    'price-desc'
  )

  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      '/products',
      {
        params: {
          search: '',
          sort: 'price-desc',
          view: 'card',
        },
        signal: expect.any(AbortSignal),
      }
    )
  })

  expect(sortSelect).toHaveValue('price-desc')
})


// TC-SEARCH-007
test('shows an empty result message when no products are found', async () => {
  mockAxios.get.mockResolvedValueOnce({
    data: [],
  })

  renderProducts('/products?search=unknown')

  expect(
    await screen.findByText('No products found')
  ).toBeInTheDocument()

  expect(
    screen.getByText('Try another search term.')
  ).toBeInTheDocument()

  expect(
    screen.getByText('0 products found')
  ).toBeInTheDocument()
})


// TC-SEARCH-008
test('shows an error message when products fail to load', async () => {
  mockAxios.get.mockRejectedValueOnce(
    new Error('Network error')
  )

  renderProducts()

  expect(
    await screen.findByText(
      'Failed to load products.'
    )
  ).toBeInTheDocument()
})


// TC-SEARCH-013
test('keeps the search query when the sorting option is changed', async () => {
  mockAxios.get.mockResolvedValue({
    data: [
      {
        _id: 'product-1',
        title: 'Premium Shirt',
      },
    ],
  })

  renderProducts('/products?search=shirt')

  await screen.findByText('Premium Shirt')

  const sortSelect = screen.getByRole('combobox')

  await userEvent.selectOptions(
    sortSelect,
    'price-asc'
  )

  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenLastCalledWith(
      '/products',
      {
        params: {
          search: 'shirt',
          sort: 'price-asc',
          view: 'card',
        },
        signal: expect.any(AbortSignal),
      }
    )
  })

  expect(sortSelect).toHaveValue('price-asc')
})


// TC-SEARCH-014
test('refetches current product stock after checkout invalidates inventory', async () => {
  mockAxios.get
    .mockResolvedValueOnce({
      data: [{ _id: 'product-1', title: 'Stone Gray', totalStock: 2 }],
    })
    .mockResolvedValueOnce({
      data: [{ _id: 'product-1', title: 'Stone Gray', totalStock: 1 }],
    })

  renderProducts()

  expect(await screen.findByText('stock 2')).toBeInTheDocument()

  act(() => {
    invalidateInventory()
  })

  expect(await screen.findByText('stock 1')).toBeInTheDocument()
  expect(mockAxios.get).toHaveBeenCalledTimes(2)
})
