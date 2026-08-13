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

import Checkout from '../../pages/Checkout'

import useAxiosSecure from '../../hooks/useAxiosSecure'
import useAuth from '../../hooks/useAuth'
import useCart from '../../hooks/useCart'

import {
  getGuestCart,
} from '../../utils/guestCart'

import toast from 'react-hot-toast'


// =====================================
// Mocks
// =====================================

vi.mock('../../hooks/useAxiosSecure', () => ({
  default: vi.fn(),
}))


vi.mock('../../hooks/useAuth', () => ({
  default: vi.fn(),
}))


vi.mock('../../hooks/useCart', () => ({
  default: vi.fn(),
}))


vi.mock('../../utils/guestCart', () => ({
  getGuestCart: vi.fn(),
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


// =====================================
// Mock Data
// =====================================

const guestCartItem = {
  _id: 'guest-product-1-M',
  productId: 'product-1',
  title: 'Premium Shirt',
  size: 'M',
  quantity: 1,
  offerPrice: 1500,
  image: 'shirt.jpg',
}


const buyNowItem = {
  _id: 'buy-now-1',
  productId: 'product-2',
  title: 'Classic Polo',
  size: 'L',
  quantity: 2,
  offerPrice: 1200,
  image: 'polo.jpg',
}

const testPaymentMethods = {
  bkash: {
    enabled: true,
    accountNumber: 'TEST-BKASH-MERCHANT',
    accountType: 'Merchant',
    instructions: 'Use the test merchant account.',
  },
  nagad: {
    enabled: true,
    accountNumber: 'TEST-NAGAD-MERCHANT',
    accountType: 'Merchant',
    instructions: 'Use the test Nagad merchant account.',
  },
}


let mockAxios
let mockRefetchCart
let mockClearCart
let consoleErrorSpy


// =====================================
// Common Setup
// =====================================

beforeEach(() => {
  vi.clearAllMocks()

  consoleErrorSpy = vi
    .spyOn(console, 'error')
    .mockImplementation(() => {})

  mockRefetchCart =
    vi.fn().mockResolvedValue({})

  mockClearCart =
    vi.fn().mockResolvedValue({})

  mockAxios = {
    get: vi.fn((url) => {
      if (url === '/settings') {
        return Promise.resolve({
          data: {
            shippingFee: 120,
            freeShipping: 3000,
            paymentMethods: testPaymentMethods,
          },
        })
      }

      return Promise.resolve({
        data: [],
      })
    }),

    post: vi.fn().mockResolvedValue({
      data: {
        orderNumber: 'RF-1001',
      },
    }),
  }

  useAxiosSecure.mockReturnValue(
    mockAxios
  )

  useAuth.mockReturnValue({
    user: null,
    loading: false,
  })

  useCart.mockReturnValue({
    refetch: mockRefetchCart,
    clearCart: mockClearCart,
  })

  useLocation.mockReturnValue({
    pathname: '/checkout',
    state: null,
  })

  getGuestCart.mockReturnValue([
    guestCartItem,
  ])
})


afterEach(() => {
  consoleErrorSpy.mockRestore()
})


// =====================================
// Render Helper
// =====================================

const renderCheckout = () => {
  return render(
    <MemoryRouter>
      <Checkout />
    </MemoryRouter>
  )
}


// =====================================
// Form Helper
// =====================================

const fillGuestDetails = async ({
  name = 'Rahim Ahmed',
  phone = '01712345678',
  email = '',
  address = 'House 10, Road 5, Dhanmondi',
  city = 'Dhaka',
  postalCode = '',
  transactionId = '',
} = {}) => {
  if (name) {
    await userEvent.type(
      screen.getByPlaceholderText(
        'Full Name'
      ),
      name
    )
  }

  if (phone) {
    await userEvent.type(
      screen.getByPlaceholderText(
        '01XXXXXXXXX'
      ),
      phone
    )
  }

  if (email) {
    await userEvent.type(
      screen.getByPlaceholderText(
        'example@email.com'
      ),
      email
    )
  }

  if (address) {
    await userEvent.type(
      screen.getByPlaceholderText(
        'House, road, area, landmark'
      ),
      address
    )
  }

  if (city) {
    await userEvent.type(
      screen.getByPlaceholderText(
        'City *'
      ),
      city
    )
  }

  if (postalCode) {
    await userEvent.type(
      screen.getByPlaceholderText(
        'Postal Code (Optional)'
      ),
      postalCode
    )
  }

  if (
    transactionId &&
    screen.queryByPlaceholderText(
      'Enter Transaction ID'
    )
  ) {
    await userEvent.type(
      screen.getByPlaceholderText(
        'Enter Transaction ID'
      ),
      transactionId
    )
  }
}

// TC-CHECKOUT-001


test('shows loading spinner while authentication is loading', () => {
  useAuth.mockReturnValue({
    user: null,
    loading: true,
  })

  const { container } =
    renderCheckout()

  expect(
    container.querySelector(
      '.loading-spinner'
    )
  ).toBeInTheDocument()
})


// TC-CHECKOUT-002

test('loads guest cart items for guest checkout', async () => {
  renderCheckout()

  expect(
    await screen.findByRole(
      'heading',
      {
        name: 'Checkout',
      }
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'Premium Shirt'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      /Checking out as guest/
    )
  ).toBeInTheDocument()

  expect(
    getGuestCart
  ).toHaveBeenCalled()
})


// TC-CHECKOUT-003

test('shows empty checkout page when guest cart has no items', async () => {
  getGuestCart.mockReturnValue([])

  renderCheckout()

  expect(
    await screen.findByRole(
      'heading',
      {
        name: 'Nothing to checkout',
      }
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'Your cart is empty.'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByRole(
      'link',
      {
        name: 'Browse Products',
      }
    )
  ).toHaveAttribute(
    'href',
    '/products'
  )
})


// TC-CHECKOUT-004

test('loads registered customer cart and saved delivery information', async () => {
  useAuth.mockReturnValue({
    user: {
      email:
        'customer@example.com',
      displayName:
        'Firebase Customer',
    },
    loading: false,
  })

  mockAxios.get.mockImplementation(
    (url) => {
      if (url === '/settings') {
        return Promise.resolve({
          data: {
            shippingFee: 120,
            freeShipping: 3000,
            paymentMethods: testPaymentMethods,
          },
        })
      }

      if (url === '/cart') {
        return Promise.resolve({
          data: [
            guestCartItem,
          ],
        })
      }

      if (
        url ===
        '/users/customer@example.com'
      ) {
        return Promise.resolve({
          data: {
            name: 'Database Customer',
            phone: '01711111111',

            addresses: [
              {
                isDefault: true,
                receiver:
                  'Default Receiver',

                phone:
                  '01812345678',

                address:
                  'House 20, Uttara',

                city: 'Dhaka',

                postalCode:
                  '1230',
              },
            ],
          },
        })
      }

      return Promise.resolve({
        data: {},
      })
    }
  )

  renderCheckout()

  expect(
    await screen.findByText(
      'Premium Shirt'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByPlaceholderText(
      'Full Name'
    )
  ).toHaveValue(
    'Default Receiver'
  )

  expect(
    screen.getByPlaceholderText(
      '01XXXXXXXXX'
    )
  ).toHaveValue(
    '01812345678'
  )

  expect(
    screen.getByPlaceholderText(
      'House, road, area, landmark'
    )
  ).toHaveValue(
    'House 20, Uttara'
  )

  expect(
    screen.getByPlaceholderText(
      'City *'
    )
  ).toHaveValue(
    'Dhaka'
  )

  expect(
    screen.getByPlaceholderText(
      'Postal Code (Optional)'
    )
  ).toHaveValue(
    '1230'
  )

  expect(
    screen.getByPlaceholderText(
      'example@email.com'
    )
  ).toHaveValue(
    'customer@example.com'
  )

  expect(
    screen.getByPlaceholderText(
      'example@email.com'
    )
  ).toBeDisabled()
})


// TC-CHECKOUT-005

test('loads only selected Buy Now item for guest checkout', async () => {
  useLocation.mockReturnValue({
    pathname: '/checkout',

    state: {
      buyNowItem,
    },
  })

  renderCheckout()

  expect(
    await screen.findByText(
      'Classic Polo'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'Buy Now'
    )
  ).toBeInTheDocument()

  expect(
    screen.queryByText(
      'Premium Shirt'
    )
  ).not.toBeInTheDocument()

  expect(
    getGuestCart
  ).not.toHaveBeenCalled()
})


// TC-CHECKOUT-006

test('calculates subtotal shipping fee and total correctly', async () => {
  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  expect(
    screen.getAllByText(
      '৳1,500'
    ).length
  ).toBeGreaterThan(0)

  expect(
    screen.getByText(
      '৳120'
    )
  ).toBeInTheDocument()

  expect(
    screen.getAllByText(
      '৳1,620'
    ).length
  ).toBeGreaterThan(0)
})


// TC-CHECKOUT-007


test('provides free shipping when subtotal reaches free shipping limit', async () => {
  getGuestCart.mockReturnValue([
    {
      ...guestCartItem,
      quantity: 2,
    },
  ])

  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  expect(
    screen.getByText(
      'Free'
    )
  ).toBeInTheDocument()

  expect(
    screen.getAllByText(
      '৳3,000'
    ).length
  ).toBeGreaterThan(0)
})


// TC-CHECKOUT-008


test('requires customer name before placing order', async () => {
  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  expect(
    toast.error
  ).toHaveBeenCalledWith(
    'Please enter your name'
  )

  expect(
    mockAxios.post
  ).not.toHaveBeenCalled()
})



// TC-CHECKOUT-009


test('requires phone number before placing order', async () => {
  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  await userEvent.type(
    screen.getByPlaceholderText(
      'Full Name'
    ),
    'Rahim Ahmed'
  )

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  expect(
    toast.error
  ).toHaveBeenCalledWith(
    'Please enter your phone number'
  )

  expect(
    mockAxios.post
  ).not.toHaveBeenCalled()
})


// TC-CHECKOUT-010


test('rejects invalid Bangladesh phone number', async () => {
  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  await userEvent.type(
    screen.getByPlaceholderText(
      'Full Name'
    ),
    'Rahim Ahmed'
  )

  await userEvent.type(
    screen.getByPlaceholderText(
      '01XXXXXXXXX'
    ),
    '01234567890'
  )

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  expect(
    toast.error
  ).toHaveBeenCalledWith(
    'Enter a valid Bangladesh phone number'
  )

  expect(
    mockAxios.post
  ).not.toHaveBeenCalled()
})


// TC-CHECKOUT-011

test('requires delivery address before placing order', async () => {
  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  await userEvent.type(
    screen.getByPlaceholderText(
      'Full Name'
    ),
    'Rahim Ahmed'
  )

  await userEvent.type(
    screen.getByPlaceholderText(
      '01XXXXXXXXX'
    ),
    '01712345678'
  )

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  expect(
    toast.error
  ).toHaveBeenCalledWith(
    'Please enter your delivery address'
  )
})


// TC-CHECKOUT-012
test('requires city before placing order', async () => {
  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  await userEvent.type(
    screen.getByPlaceholderText(
      'Full Name'
    ),
    'Rahim Ahmed'
  )

  await userEvent.type(
    screen.getByPlaceholderText(
      '01XXXXXXXXX'
    ),
    '01712345678'
  )

  await userEvent.type(
    screen.getByPlaceholderText(
      'House, road, area, landmark'
    ),
    'House 10, Dhanmondi'
  )

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  expect(
    toast.error
  ).toHaveBeenCalledWith(
    'Please enter your city'
  )
})



// TC-CHECKOUT-013


test('rejects invalid optional email address', async () => {
  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  await fillGuestDetails({
    email: 'invalid-email',
  })

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  expect(
    toast.error
  ).toHaveBeenCalledWith(
    'Enter a valid email address'
  )

  expect(
    mockAxios.post
  ).not.toHaveBeenCalled()
})


// TC-CHECKOUT-014

test('shows configured bKash and Nagad details while COD needs no transaction ID', async () => {
  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  expect(
    screen.getByRole('button', {
      name: 'bKash',
    })
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'TEST-BKASH-MERCHANT'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByPlaceholderText(
      'Enter Transaction ID'
    )
  ).toBeInTheDocument()

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Nagad',
    })
  )

  expect(
    screen.getByText(
      'TEST-NAGAD-MERCHANT'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'Nagad Transaction ID *'
    )
  ).toBeInTheDocument()

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Cash on Delivery',
    })
  )

  expect(
    screen.queryByPlaceholderText(
      'Enter Transaction ID'
    )
  ).not.toBeInTheDocument()
})


// TC-CHECKOUT-014A

test('requires transaction ID for bKash payment', async () => {
  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  await fillGuestDetails()

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  expect(
    toast.error
  ).toHaveBeenCalledWith(
    'Please enter the Transaction ID'
  )

  expect(
    mockAxios.post
  ).not.toHaveBeenCalled()
})


// TC-CHECKOUT-014B

test('requires transaction ID for Nagad payment', async () => {
  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Nagad',
    })
  )

  await fillGuestDetails()

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  expect(
    toast.error
  ).toHaveBeenCalledWith(
    'Please enter the Transaction ID'
  )

  expect(
    mockAxios.post
  ).not.toHaveBeenCalled()
})


// TC-CHECKOUT-015

test('allows Cash on Delivery without transaction ID', async () => {
  mockAxios.post.mockResolvedValueOnce({
    data: {
      orderNumber:
        'RF-COD-001',
    },
  })

  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name:
          'Cash on Delivery',
      }
    )
  )

  await fillGuestDetails()

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  await waitFor(() => {
    expect(
      mockAxios.post
    ).toHaveBeenCalledWith(
      '/orders/guest',
      expect.objectContaining({
        paymentMethod: 'cod',
      })
    )
  })

  expect(
    await screen.findByText(
      'Order Confirmed'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'RF-COD-001'
    )
  ).toBeInTheDocument()

  expect(
    mockAxios.post.mock.calls[0][1]
  ).not.toHaveProperty('transactionId')

  expect(
    screen.getByText(
      'Payment will be collected when your order is delivered.'
    )
  ).toBeInTheDocument()
})


// TC-CHECKOUT-016

test('places guest cart order with correct order information and clears cart', async () => {
  mockAxios.post.mockResolvedValueOnce({
    data: {
      orderNumber:
        'RF-GUEST-001',
    },
  })

  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  await fillGuestDetails({
    email:
      'guest@example.com',

    postalCode:
      '1209',

    transactionId:
      'BKASH123456',
  })

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  await waitFor(() => {
    expect(
      mockAxios.post
    ).toHaveBeenCalledWith(
      '/orders/guest',
      {
        customerName:
          'Rahim Ahmed',

        phone:
          '01712345678',

        address:
          'House 10, Road 5, Dhanmondi',

        city:
          'Dhaka',

        postalCode:
          '1209',

        transactionId:
          'BKASH123456',

        paymentMethod:
          'bkash',

        email:
          'guest@example.com',

        orderSource:
          'cart',

        products: [
          {
            productId:
              'product-1',

            size: 'M',

            quantity: 1,
          },
        ],
      }
    )
  })

  expect(
    mockClearCart
  ).toHaveBeenCalledTimes(1)

  expect(
    toast.success
  ).toHaveBeenCalledWith(
    'Order placed successfully'
  )

  expect(
    await screen.findByText(
      'RF-GUEST-001'
    )
  ).toBeInTheDocument()
})

// TC-CHECKOUT-017

test('places guest Buy Now order without clearing existing cart', async () => {
  useLocation.mockReturnValue({
    pathname: '/checkout',

    state: {
      buyNowItem,
    },
  })

  mockAxios.post.mockResolvedValueOnce({
    data: {
      orderNumber:
        'RF-BUY-001',
    },
  })

  renderCheckout()

  await screen.findByText(
    'Classic Polo'
  )

  await fillGuestDetails({
    transactionId:
      'BKASHBUY123',
  })

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  await waitFor(() => {
    expect(
      mockAxios.post
    ).toHaveBeenCalledWith(
      '/orders/guest',
      expect.objectContaining({
        orderSource:
          'buy_now',

        products: [
          {
            productId:
              'product-2',

            size: 'L',

            quantity: 2,
          },
        ],
      })
    )
  })

  expect(
    mockClearCart
  ).not.toHaveBeenCalled()

  expect(
    await screen.findByText(
      'RF-BUY-001'
    )
  ).toBeInTheDocument()
})



// TC-CHECKOUT-018


test('places registered customer cart order and refreshes cart', async () => {
  useAuth.mockReturnValue({
    user: {
      email:
        'customer@example.com',

      displayName:
        'Customer',
    },

    loading: false,
  })

  mockAxios.get.mockImplementation(
    (url) => {
      if (url === '/settings') {
        return Promise.resolve({
          data: {
            shippingFee: 120,
            freeShipping: 3000,
            paymentMethods: testPaymentMethods,
          },
        })
      }

      if (url === '/cart') {
        return Promise.resolve({
          data: [
            guestCartItem,
          ],
        })
      }

      if (
        url ===
        '/users/customer@example.com'
      ) {
        return Promise.resolve({
          data: {
            name:
              'Registered Customer',

            phone:
              '01712345678',

            addresses: [
              {
                isDefault: true,

                address:
                  'Banani, Dhaka',

                city:
                  'Dhaka',

                postalCode:
                  '1213',
              },
            ],
          },
        })
      }

      return Promise.resolve({
        data: {},
      })
    }
  )

  mockAxios.post.mockResolvedValueOnce({
    data: {
      orderNumber:
        'RF-USER-001',
    },
  })

  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  await userEvent.type(
    screen.getByPlaceholderText(
      'Enter Transaction ID'
    ),
    'BKASHUSER123'
  )

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  await waitFor(() => {
    expect(
      mockAxios.post
    ).toHaveBeenCalledWith(
      '/orders',
      expect.objectContaining({
        customerName:
          'Registered Customer',

        phone:
          '01712345678',

        address:
          'Banani, Dhaka',

        city:
          'Dhaka',

        paymentMethod:
          'bkash',

        transactionId:
          'BKASHUSER123',
      })
    )
  })

  const orderData =
    mockAxios.post.mock.calls[0][1]

  expect(
    orderData
  ).not.toHaveProperty(
    'products'
  )

  expect(
    mockRefetchCart
  ).toHaveBeenCalledTimes(1)

  expect(
    mockClearCart
  ).not.toHaveBeenCalled()
})



// TC-CHECKOUT-019

test('places registered customer Buy Now order with selected product only', async () => {
  useAuth.mockReturnValue({
    user: {
      email:
        'customer@example.com',

      displayName:
        'Customer',
    },

    loading: false,
  })

  useLocation.mockReturnValue({
    pathname: '/checkout',

    state: {
      buyNowItem,
    },
  })

  mockAxios.get.mockImplementation(
    (url) => {
      if (url === '/settings') {
        return Promise.resolve({
          data: {
            shippingFee: 120,
            freeShipping: 3000,
            paymentMethods: testPaymentMethods,
          },
        })
      }

      if (
        url ===
        '/users/customer@example.com'
      ) {
        return Promise.resolve({
          data: {
            name:
              'Registered Customer',

            phone:
              '01712345678',

            addresses: [
              {
                isDefault: true,

                address:
                  'Gulshan, Dhaka',

                city:
                  'Dhaka',

                postalCode:
                  '1212',
              },
            ],
          },
        })
      }

      return Promise.resolve({
        data: {},
      })
    }
  )

  mockAxios.post.mockResolvedValueOnce({
    data: {
      orderNumber:
        'RF-USER-BUY-001',
    },
  })

  renderCheckout()

  await screen.findByText(
    'Classic Polo'
  )

  await userEvent.type(
    screen.getByPlaceholderText(
      'Enter Transaction ID'
    ),
    'BKASHBUYUSER'
  )

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  await waitFor(() => {
    expect(
      mockAxios.post
    ).toHaveBeenCalledWith(
      '/orders',
      expect.objectContaining({
        products: [
          {
            productId:
              'product-2',

            size: 'L',

            quantity: 2,
          },
        ],
      })
    )
  })

  expect(
    mockRefetchCart
  ).not.toHaveBeenCalled()

  expect(
    mockClearCart
  ).not.toHaveBeenCalled()
})


// =====================================
// TC-CHECKOUT-020
// =====================================

test('shows server error when order placement fails', async () => {
  mockAxios.post.mockRejectedValueOnce({
    response: {
      data: {
        message:
          'Product is out of stock',
      },
    },
  })

  renderCheckout()

  await screen.findByText(
    'Premium Shirt'
  )

  await fillGuestDetails({
    transactionId:
      'BKASHERROR123',
  })

  await userEvent.click(
    screen.getByRole(
      'button',
      {
        name: /Place Order/,
      }
    )
  )

  await waitFor(() => {
    expect(
      toast.error
    ).toHaveBeenCalledWith(
      'Product is out of stock'
    )
  })

  expect(
    screen.getByRole(
      'heading',
      {
        name: 'Checkout',
      }
    )
  ).toBeInTheDocument()

  expect(
    screen.queryByText(
      'Order Confirmed'
    )
  ).not.toBeInTheDocument()
})
