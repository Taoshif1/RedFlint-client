import {
  render,
  screen,
} from '@testing-library/react'

import {
  MemoryRouter,
} from 'react-router'

import RecentOrders from '../../components/dashboard/customer/RecentOrders'

import useOrders from '../../hooks/useOrders'


vi.mock('../../hooks/useOrders', () => ({
  default: vi.fn(),
}))


const sampleOrder = {
  _id: '68abc123def4567890abcd12',

  orderNumber:
    'RF-20260812-ORDER1',

  createdAt:
    '2026-08-12T12:00:00.000Z',

  orderStatus:
    'Shipped',

  total: 3120,
}


beforeEach(() => {
  vi.clearAllMocks()

  useOrders.mockReturnValue({
    orders: [
      sampleOrder,
    ],

    loading: false,

    refetch: vi.fn(),
  })
})


const renderRecentOrders = () => {
  return render(
    <MemoryRouter>
      <RecentOrders />
    </MemoryRouter>
  )
}


// TC-ORDER-001
test('shows loading spinner while orders are loading', () => {
  useOrders.mockReturnValue({
    orders: [],

    loading: true,

    refetch: vi.fn(),
  })

  const {
    container,
  } = renderRecentOrders()

  expect(
    container.querySelector(
      '.loading-spinner'
    )
  ).toBeInTheDocument()
})


// TC-ORDER-002
test('shows empty message when customer has no orders', () => {
  useOrders.mockReturnValue({
    orders: [],

    loading: false,

    refetch: vi.fn(),
  })

  renderRecentOrders()

  expect(
    screen.getByText(
      'No orders yet.'
    )
  ).toBeInTheDocument()
})


// TC-ORDER-003
test('displays customer order information and details link correctly', () => {
  renderRecentOrders()

  expect(
    screen.getByText(
      'RF-20260812-ORDER1'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'Shipped'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      '৳3,120'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByRole(
      'link',
      {
        name: 'Details',
      }
    )
  ).toHaveAttribute(
    'href',
    '/dashboard/orders/68abc123def4567890abcd12'
  )

  expect(
    screen.getByRole(
      'link',
      {
        name: 'View All',
      }
    )
  ).toHaveAttribute(
    'href',
    '/dashboard/recent-orders'
  )
})