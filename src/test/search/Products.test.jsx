import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'

import Products from '../../pages/Products'
import useAxiosSecure from '../../hooks/useAxiosSecure'


vi.mock('../../hooks/useAxiosSecure', () => ({
  default: vi.fn(),
}))


vi.mock('../../components/shared/Product', () => ({
  default: ({ product }) => (
    <div data-testid="product-card">
      {product.title}
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
      },
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
      },
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
        },
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
        },
      }
    )
  })

  expect(sortSelect).toHaveValue('price-asc')
})