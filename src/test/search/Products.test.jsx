import { act, render, screen, waitFor, within } from '@testing-library/react'
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


const categoryProducts = [
  {
    _id: 'cuban-low',
    title: 'Silver Stride Shirt',
    category: 'Cuban',
  },
  {
    _id: 'formal-low',
    title: 'Formal White Shirt',
    category: 'Formal',
  },
  {
    _id: 'cuban-high',
    title: 'Desert Sand Shirt',
    category: 'Cuban',
  },
  {
    _id: 'full-sleeve',
    title: 'Stone Gray Shirt',
    category: ' Full Sleeve ',
  },
  {
    _id: 'uncategorized',
    title: 'Uncategorized Shirt',
    category: '',
  },
]


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

  const sortSelect = screen.getByRole('combobox', {
    name: 'Sort Products',
  })

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
    screen.getByText('Try another search term or category.')
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

  const sortSelect = screen.getByRole('combobox', {
    name: 'Sort Products',
  })

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


// TC-SEARCH-015
test('builds unique category options from backend product data', async () => {
  mockAxios.get.mockResolvedValueOnce({ data: categoryProducts })

  renderProducts()

  const categoryFilter = await screen.findByRole('combobox', {
    name: 'Filter by Category',
  })
  const options = within(categoryFilter).getAllByRole('option')

  expect(options.map((option) => option.textContent)).toEqual([
    'All Categories',
    'Cuban',
    'Formal',
    'Full Sleeve',
  ])

  expect(mockAxios.get).toHaveBeenCalledWith('/products', {
    signal: expect.any(AbortSignal),
    params: {
      search: '',
      sort: 'newest',
      view: 'card',
    },
  })
})


// TC-SEARCH-016
test('filters the server-sorted products by category without another request', async () => {
  const user = userEvent.setup()
  mockAxios.get.mockResolvedValueOnce({ data: categoryProducts })

  renderProducts('/products?sort=price-asc')

  const categoryFilter = await screen.findByRole('combobox', {
    name: 'Filter by Category',
  })

  await user.selectOptions(categoryFilter, 'Cuban')

  const visibleProducts = screen.getAllByTestId('product-card')

  expect(visibleProducts.map((product) => product.firstChild.textContent)).toEqual([
    'Silver Stride Shirt',
    'Desert Sand Shirt',
  ])
  expect(screen.getByText('2 products found')).toBeInTheDocument()
  expect(screen.queryByText('Formal White Shirt')).not.toBeInTheDocument()
  expect(mockAxios.get).toHaveBeenCalledTimes(1)
  expect(mockAxios.get).toHaveBeenCalledWith('/products', {
    signal: expect.any(AbortSignal),
    params: {
      search: '',
      sort: 'price-asc',
      view: 'card',
    },
  })
})


// TC-SEARCH-017
test('keeps the selected category when the sort changes', async () => {
  const user = userEvent.setup()
  mockAxios.get.mockResolvedValue({ data: categoryProducts })

  renderProducts('/products?category=Cuban')

  const categoryFilter = await screen.findByRole('combobox', {
    name: 'Filter by Category',
  })
  const sortSelect = screen.getByRole('combobox', {
    name: 'Sort Products',
  })

  expect(categoryFilter).toHaveValue('Cuban')

  await user.selectOptions(sortSelect, 'price-desc')

  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenLastCalledWith('/products', {
      signal: expect.any(AbortSignal),
      params: {
        search: '',
        sort: 'price-desc',
        view: 'card',
      },
    })
  })

  expect(categoryFilter).toHaveValue('Cuban')
})
