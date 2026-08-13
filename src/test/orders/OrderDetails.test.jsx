import {
  render,
  screen,
} from '@testing-library/react'

import {
  MemoryRouter,
  useParams,
} from 'react-router'

import OrderDetails from '../../pages/OrderDetails'

import useOrder from '../../hooks/useOrder'


vi.mock('../../hooks/useOrder', () => ({
  default: vi.fn(),
}))


vi.mock('react-router', async () => {
  const actual =
    await vi.importActual(
      'react-router'
    )

  return {
    ...actual,

    useParams: vi.fn(),
  }
})


const sampleOrder = {
  _id:
    '68abc123def4567890abcd12',

  orderNumber:
    'RF-20260812-ORDER1',

  createdAt:
    '2026-08-12T12:00:00.000Z',

  orderStatus:
    'Shipped',

  payment: {
    method: 'bkash',

    status: 'Verified',
  },

  products: [
    {
      productId:
        'product-1',

      title:
        'Premium Shirt',

      image:
        'shirt.jpg',

      size: 'M',

      quantity: 2,

      lineTotal: 3000,
    },
  ],

  customerName:
    'Taoshif Gazi',

  phone:
    '01712345678',

  address:
    'Road 10, Banani',

  city:
    'Dhaka',

  postalCode:
    '1207',

  subtotal: 3000,

  shipping: 120,

  total: 3120,
}


beforeEach(() => {
  vi.clearAllMocks()

  useParams.mockReturnValue({
    id:
      '68abc123def4567890abcd12',
  })

  useOrder.mockReturnValue({
    order: sampleOrder,

    loading: false,
  })
})


const renderOrderDetails = () => {
  return render(
    <MemoryRouter>
      <OrderDetails />
    </MemoryRouter>
  )
}


// TC-ORDER-006
test('shows order not found message when order does not exist', () => {
  useOrder.mockReturnValue({
    order: null,

    loading: false,
  })

  renderOrderDetails()

  expect(
    screen.getByText(
      'Order Not Found'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByRole(
      'link',
      {
        name:
          'Back to Orders',
      }
    )
  ).toHaveAttribute(
    'href',
    '/dashboard/recent-orders'
  )
})


// TC-ORDER-007
test('displays complete customer order details correctly', () => {
  renderOrderDetails()

  expect(
    useOrder
  ).toHaveBeenCalledWith(
    '68abc123def4567890abcd12'
  )

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
      'Payment: Verified'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByRole(
      'link',
      {
        name:
          'Premium Shirt',
      }
    )
  ).toHaveAttribute(
    'href',
    '/products/product-1'
  )

  expect(
    screen.getByText(
      'Size: M'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'Quantity: 2'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByRole(
      'img',
      {
        name:
          'Premium Shirt',
      }
    )
  ).toHaveAttribute(
    'src',
    'shirt.jpg'
  )

  expect(
    screen.getAllByText(
      '৳3,000'
    ).length
  ).toBeGreaterThan(0)

  expect(
    screen.getByText(
      'Taoshif Gazi'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      '01712345678'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'Road 10, Banani'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'Dhaka, 1207'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      '৳120'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      '৳3,120'
    )
  ).toBeInTheDocument()
})