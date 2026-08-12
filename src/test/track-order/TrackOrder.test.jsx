import {
  render,
  screen,
  waitFor,
} from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import {
  MemoryRouter,
  useLocation,
} from 'react-router'

import TrackOrder from '../../pages/TrackOrder'

import useAxiosSecure from '../../hooks/useAxiosSecure'
import useSettings from '../../hooks/useSettings'

import toast from 'react-hot-toast'


vi.mock('../../hooks/useAxiosSecure', () => ({
  default: vi.fn(),
}))


vi.mock('../../hooks/useSettings', () => ({
  default: vi.fn(),
}))


vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))


vi.mock('react-router', async () => {
  const actual =
    await vi.importActual('react-router')

  return {
    ...actual,
    useLocation: vi.fn(),
  }
})


const trackedOrder = {
  orderNumber: 'RF-20260812-ABC123',

  customerType: 'guest',

  orderSource: 'cart',

  orderStatus: 'Processing',

  products: [
    {
      productId: 'product-1',

      title: 'Premium Shirt',

      image: 'shirt.jpg',

      size: 'M',

      quantity: 2,

      lineTotal: 3000,
    },
  ],

  payment: {
    method: 'bkash',

    status: 'Verified',
  },

  total: 3120,
}


let mockAxios
let consoleErrorSpy


beforeEach(() => {
  vi.clearAllMocks()

  consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {})

  mockAxios = {
    post: vi.fn(),
  }

  useAxiosSecure.mockReturnValue(
    mockAxios
  )

  useSettings.mockReturnValue({
    settings: {},
    loading: false,
    refetch: vi.fn(),
  })

  useLocation.mockReturnValue({
    pathname: '/track-order',
    state: null,
  })
})


afterEach(() => {
  consoleErrorSpy.mockRestore()
})


const renderTrackOrder = () => {
  return render(
    <MemoryRouter>
      <TrackOrder />
    </MemoryRouter>
  )
}


const fillTrackingForm = async ({
  orderNumber =
    'RF-20260812-ABC123',

  phone =
    '01712345678',
} = {}) => {
  const user =
    userEvent.setup()

  if (orderNumber) {
    await user.type(
      screen.getByPlaceholderText(
        'RF-20260810-A4C91F'
      ),
      orderNumber
    )
  }

  if (phone) {
    await user.type(
      screen.getByPlaceholderText(
        '01XXXXXXXXX'
      ),
      phone
    )
  }

  return user
}


// TC-TRACK-001
test('requires order number before tracking an order', async () => {
  renderTrackOrder()

  const user =
    userEvent.setup()

  await user.type(
    screen.getByPlaceholderText(
      '01XXXXXXXXX'
    ),
    '01712345678'
  )

  await user.click(
    screen.getByRole(
      'button',
      {
        name: 'Track Order',
      }
    )
  )

  expect(
    toast.error
  ).toHaveBeenCalledWith(
    'Enter your order number'
  )

  expect(
    mockAxios.post
  ).not.toHaveBeenCalled()
})


// TC-TRACK-002
test('requires phone number before tracking an order', async () => {
  renderTrackOrder()

  const user =
    userEvent.setup()

  await user.type(
    screen.getByPlaceholderText(
      'RF-20260810-A4C91F'
    ),
    'RF-20260812-ABC123'
  )

  await user.click(
    screen.getByRole(
      'button',
      {
        name: 'Track Order',
      }
    )
  )

  expect(
    toast.error
  ).toHaveBeenCalledWith(
    'Enter your phone number'
  )

  expect(
    mockAxios.post
  ).not.toHaveBeenCalled()
})


// TC-TRACK-003
test('tracks order successfully using order number and phone number', async () => {
  mockAxios.post.mockResolvedValueOnce({
    data: {
      order: trackedOrder,
    },
  })

  renderTrackOrder()

  const user =
    await fillTrackingForm()

  await user.click(
    screen.getByRole(
      'button',
      {
        name: 'Track Order',
      }
    )
  )

  await waitFor(() => {
    expect(
      mockAxios.post
    ).toHaveBeenCalledWith(
      '/orders/track',
      {
        orderNumber:
          'RF-20260812-ABC123',

        phone:
          '01712345678',
      }
    )
  })

  expect(
    await screen.findByText(
      'RF-20260812-ABC123'
    )
  ).toBeInTheDocument()

  expect(
    screen.getAllByText(
      'Processing'
    ).length
  ).toBeGreaterThan(0)

  expect(
    screen.getByText(
      'guest'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'cart'
    )
  ).toBeInTheDocument()
})


// TC-TRACK-004
test('prefills order number and phone number from route state', () => {
  useLocation.mockReturnValue({
    pathname: '/track-order',

    state: {
      orderNumber:
        'RF-20260812-PREFILL',

      phone:
        '01812345678',
    },
  })

  renderTrackOrder()

  expect(
    screen.getByPlaceholderText(
      'RF-20260810-A4C91F'
    )
  ).toHaveValue(
    'RF-20260812-PREFILL'
  )

  expect(
    screen.getByPlaceholderText(
      '01XXXXXXXXX'
    )
  ).toHaveValue(
    '01812345678'
  )
})


// TC-TRACK-005
test('shows server error when order tracking fails', async () => {
  mockAxios.post.mockRejectedValueOnce({
    response: {
      data: {
        message:
          'Order not found or phone does not match',
      },
    },
  })

  renderTrackOrder()

  const user =
    await fillTrackingForm()

  await user.click(
    screen.getByRole(
      'button',
      {
        name: 'Track Order',
      }
    )
  )

  await waitFor(() => {
    expect(
      toast.error
    ).toHaveBeenCalledWith(
      'Order not found or phone does not match'
    )
  })

  expect(
    screen.queryByText(
      'Delivery Progress'
    )
  ).not.toBeInTheDocument()
})


// TC-TRACK-006
test('shows cancelled order message when order status is Cancelled', async () => {
  mockAxios.post.mockResolvedValueOnce({
    data: {
      order: {
        ...trackedOrder,

        orderStatus:
          'Cancelled',
      },
    },
  })

  renderTrackOrder()

  const user =
    await fillTrackingForm()

  await user.click(
    screen.getByRole(
      'button',
      {
        name: 'Track Order',
      }
    )
  )

  expect(
    await screen.findByText(
      'This order has been cancelled.'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'Cancelled'
    )
  ).toBeInTheDocument()
})


// TC-TRACK-007
test('displays tracked order product payment and total information correctly', async () => {
  mockAxios.post.mockResolvedValueOnce({
    data: {
      order: trackedOrder,
    },
  })

  renderTrackOrder()

  const user =
    await fillTrackingForm()

  await user.click(
    screen.getByRole(
      'button',
      {
        name: 'Track Order',
      }
    )
  )

  expect(
    await screen.findByText(
      'Premium Shirt'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'Size: M • Quantity: 2'
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
    screen.getByText(
      '৳3,000'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'bkash'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'Verified'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      '৳3,120'
    )
  ).toBeInTheDocument()
})


// TC-TRACK-008
test('shows WhatsApp support link for a tracked order when support number exists', async () => {
  useSettings.mockReturnValue({
    settings: {
      whatsappNumber:
        '01712345678',
    },

    loading: false,

    refetch: vi.fn(),
  })

  mockAxios.post.mockResolvedValueOnce({
    data: {
      order: trackedOrder,
    },
  })

  renderTrackOrder()

  const user =
    await fillTrackingForm()

  await user.click(
    screen.getByRole(
      'button',
      {
        name: 'Track Order',
      }
    )
  )

  const supportLink =
    await screen.findByRole(
      'link',
      {
        name:
          /Contact Support About This Order/i,
      }
    )

  expect(
    supportLink
  ).toHaveAttribute(
    'target',
    '_blank'
  )

  expect(
    supportLink.getAttribute(
      'href'
    )
  ).toContain(
    'https://wa.me/8801712345678'
  )

  expect(
    supportLink.getAttribute(
      'href'
    )
  ).toContain(
    'RF-20260812-ABC123'
  )
})


// TC-TRACK-009
test('shows tracking loading state while order request is in progress', async () => {
  let resolveRequest

  const pendingRequest =
    new Promise((resolve) => {
      resolveRequest = resolve
    })

  mockAxios.post.mockReturnValueOnce(
    pendingRequest
  )

  renderTrackOrder()

  const user =
    await fillTrackingForm()

  await user.click(
    screen.getByRole(
      'button',
      {
        name: 'Track Order',
      }
    )
  )

  expect(
    screen.getByRole(
      'button',
      {
        name: /Tracking/i,
      }
    )
  ).toBeDisabled()

  expect(
    screen.getByText(
      'Tracking...'
    )
  ).toBeInTheDocument()

  resolveRequest({
    data: {
      order: trackedOrder,
    },
  })

  await waitFor(() => {
    expect(
      screen.getByRole(
        'button',
        {
          name: 'Track Order',
        }
      )
    ).not.toBeDisabled()
  })
})