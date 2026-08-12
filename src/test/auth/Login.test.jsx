import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'

import { MemoryRouter } from 'react-router'

import Login from '../../pages/Login'


const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),

  location: {
    state: null,
  },

  toastSuccess: vi.fn(),
  toastError: vi.fn(),

  useAuth: vi.fn(),
  useAxiosSecure: vi.fn(),
}))


vi.mock('react-router', async () => {
  const actual =
    await vi.importActual('react-router')

  return {
    ...actual,

    useNavigate: () =>
      mocks.navigate,

    useLocation: () =>
      mocks.location,
  }
})


vi.mock('react-hot-toast', () => ({
  default: {
    success:
      mocks.toastSuccess,

    error:
      mocks.toastError,
  },
}))


vi.mock('../../hooks/useAuth', () => ({
  default:
    mocks.useAuth,
}))


vi.mock('../../hooks/useAxiosSecure', () => ({
  default:
    mocks.useAxiosSecure,
}))


let auth
let axiosSecure


beforeEach(() => {
  vi.clearAllMocks()

  mocks.location = {
    state: null,
  }

  auth = {
    signIn: vi.fn(),

    googleSignIn: vi.fn(),

    resetPassword: vi.fn(),

    syncSession: vi.fn(),
  }

  axiosSecure = {
    get: vi.fn(),

    patch: vi.fn(),

    post: vi.fn(),
  }

  mocks.useAuth.mockReturnValue(
    auth
  )

  mocks.useAxiosSecure.mockReturnValue(
    axiosSecure
  )
})


const renderLogin = () => {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  )
}


const fillLoginForm = (
  email = 'customer@example.com',
  password = 'Strong@123'
) => {
  fireEvent.change(
    screen.getByPlaceholderText(
      'Email Address'
    ),
    {
      target: {
        value: email,
      },
    }
  )

  fireEvent.change(
    screen.getByPlaceholderText(
      'Password'
    ),
    {
      target: {
        value: password,
      },
    }
  )
}


// TC-AUTH-001
test('logs in customer and returns user to previous protected page', async () => {
  mocks.location = {
    state: {
      from: {
        pathname: '/checkout',
      },
    },
  }

  auth.signIn.mockResolvedValue({
    user: {
      email:
        'customer@example.com',
    },
  })

  auth.syncSession.mockResolvedValue()

  axiosSecure.patch.mockResolvedValue({
    data: {},
  })

  axiosSecure.get.mockResolvedValue({
    data: {
      role: 'customer',
      isBlocked: false,
    },
  })

  renderLogin()

  fillLoginForm()

  fireEvent.click(
    screen.getByRole(
      'button',
      {
        name: 'Login',
      }
    )
  )

  await waitFor(() => {
    expect(
      auth.signIn
    ).toHaveBeenCalledWith(
      'customer@example.com',
      'Strong@123'
    )
  })

  expect(
    auth.syncSession
  ).toHaveBeenCalled()

  expect(
    axiosSecure.patch
  ).toHaveBeenCalledWith(
    '/users/login/customer@example.com'
  )

  expect(
    axiosSecure.get
  ).toHaveBeenCalledWith(
    '/users/customer@example.com'
  )

  expect(
    mocks.toastSuccess
  ).toHaveBeenCalledWith(
    'Login successful!'
  )

  expect(
    mocks.navigate
  ).toHaveBeenCalledWith(
    '/checkout',
    {
      replace: true,
    }
  )
})


// TC-AUTH-002
test('redirects admin user to admin dashboard after login', async () => {
  auth.signIn.mockResolvedValue({
    user: {
      email:
        'admin@example.com',
    },
  })

  auth.syncSession.mockResolvedValue()

  axiosSecure.patch.mockResolvedValue({
    data: {},
  })

  axiosSecure.get.mockResolvedValue({
    data: {
      role: 'admin',
      isBlocked: false,
    },
  })

  renderLogin()

  fillLoginForm(
    'admin@example.com'
  )

  fireEvent.click(
    screen.getByRole(
      'button',
      {
        name: 'Login',
      }
    )
  )

  await waitFor(() => {
    expect(
      mocks.navigate
    ).toHaveBeenCalledWith(
      '/admin',
      {
        replace: true,
      }
    )
  })
})


// TC-AUTH-003
test('does not redirect blocked account after login', async () => {
  auth.signIn.mockResolvedValue({
    user: {
      email:
        'blocked@example.com',
    },
  })

  auth.syncSession.mockResolvedValue()

  axiosSecure.patch.mockResolvedValue({
    data: {},
  })

  axiosSecure.get.mockResolvedValue({
    data: {
      role: 'customer',
      isBlocked: true,
    },
  })

  renderLogin()

  fillLoginForm(
    'blocked@example.com'
  )

  fireEvent.click(
    screen.getByRole(
      'button',
      {
        name: 'Login',
      }
    )
  )

  await waitFor(() => {
    expect(
      mocks.toastError
    ).toHaveBeenCalledWith(
      'This account is blocked. Contact RedFlint support.'
    )
  })

  expect(
    mocks.navigate
  ).not.toHaveBeenCalled()
})


// TC-AUTH-004
test('shows correct message for invalid login credentials', async () => {
  auth.signIn.mockRejectedValue({
    code:
      'auth/invalid-credential',
  })

  renderLogin()

  fillLoginForm()

  fireEvent.click(
    screen.getByRole(
      'button',
      {
        name: 'Login',
      }
    )
  )

  await waitFor(() => {
    expect(
      mocks.toastError
    ).toHaveBeenCalledWith(
      'Invalid email or password.'
    )
  })
})


// TC-AUTH-005
test('sends password reset email using entered email address', async () => {
  auth.resetPassword.mockResolvedValue()

  renderLogin()

  fireEvent.change(
    screen.getByPlaceholderText(
      'Email Address'
    ),
    {
      target: {
        value:
          ' customer@example.com ',
      },
    }
  )

  fireEvent.click(
    screen.getByRole(
      'button',
      {
        name:
          'Forgot Password?',
      }
    )
  )

  await waitFor(() => {
    expect(
      auth.resetPassword
    ).toHaveBeenCalledWith(
      'customer@example.com'
    )
  })

  expect(
    mocks.toastSuccess
  ).toHaveBeenCalledWith(
    'Password reset email sent. Check your inbox.'
  )
})


// TC-AUTH-006
test('logs in with Google and creates or syncs user profile', async () => {
  auth.googleSignIn.mockResolvedValue({
    user: {
      email:
        'google@example.com',

      displayName:
        'Google User',

      phoneNumber:
        '01712345678',

      photoURL:
        'google-photo.jpg',
    },
  })

  auth.syncSession.mockResolvedValue()

  axiosSecure.post.mockResolvedValue({
    data: {},
  })

  axiosSecure.patch.mockResolvedValue({
    data: {},
  })

  axiosSecure.get.mockResolvedValue({
    data: {
      role: 'customer',
      isBlocked: false,
    },
  })

  renderLogin()

  fireEvent.click(
    screen.getByRole(
      'button',
      {
        name:
          'Continue with Google',
      }
    )
  )

  await waitFor(() => {
    expect(
      auth.googleSignIn
    ).toHaveBeenCalled()
  })

  expect(
    auth.syncSession
  ).toHaveBeenCalled()

  expect(
    axiosSecure.post
  ).toHaveBeenCalledWith(
    '/users',
    {
      name: 'Google User',

      phone:
        '01712345678',

      photoURL:
        'google-photo.jpg',
    }
  )

  expect(
    axiosSecure.patch
  ).toHaveBeenCalledWith(
    '/users/login/google@example.com'
  )

  expect(
    mocks.navigate
  ).toHaveBeenCalledWith(
    '/dashboard',
    {
      replace: true,
    }
  )
})