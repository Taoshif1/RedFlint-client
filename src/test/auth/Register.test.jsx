import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react'

import { MemoryRouter } from 'react-router'

import Register from '../../pages/Register'


const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),

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

  auth = {
    createUser: vi.fn(),

    updateUser: vi.fn(),

    googleSignIn: vi.fn(),

    syncSession: vi.fn(),
  }

  axiosSecure = {
    post: vi.fn(),
  }

  mocks.useAuth.mockReturnValue(
    auth
  )

  mocks.useAxiosSecure.mockReturnValue(
    axiosSecure
  )
})


const renderRegister = () => {
  return render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  )
}


const fillRegisterForm = ({
  name = 'Taoshif Gazi',

  phone = '01712345678',

  email =
    'customer@example.com',

  password =
    'Strong@123',

  confirm =
    'Strong@123',
} = {}) => {
  fireEvent.change(
    screen.getByPlaceholderText(
      'Full Name'
    ),
    {
      target: {
        value: name,
      },
    }
  )

  fireEvent.change(
    screen.getByPlaceholderText(
      'Phone Number'
    ),
    {
      target: {
        value: phone,
      },
    }
  )

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

  fireEvent.change(
    screen.getByPlaceholderText(
      'Confirm Password'
    ),
    {
      target: {
        value: confirm,
      },
    }
  )
}


// TC-AUTH-007
test('rejects registration when passwords do not match', () => {
  renderRegister()

  fillRegisterForm({
    password:
      'Strong@123',

    confirm:
      'Different@123',
  })

  fireEvent.click(
    screen.getByRole(
      'button',
      {
        name:
          'Create Account',
      }
    )
  )

  expect(
    mocks.toastError
  ).toHaveBeenCalledWith(
    'Passwords do not match.'
  )

  expect(
    auth.createUser
  ).not.toHaveBeenCalled()
})


// TC-AUTH-008
test('rejects password shorter than six characters', () => {
  renderRegister()

  fillRegisterForm({
    password: 'Aa@1',
    confirm: 'Aa@1',
  })

  fireEvent.click(
    screen.getByRole(
      'button',
      {
        name:
          'Create Account',
      }
    )
  )

  expect(
    mocks.toastError
  ).toHaveBeenCalledWith(
    'Password must be at least 6 characters.'
  )

  expect(
    auth.createUser
  ).not.toHaveBeenCalled()
})


// TC-AUTH-009
test('registers customer successfully and creates database profile', async () => {
  auth.createUser.mockResolvedValue({
    user: {
      email:
        'customer@example.com',
    },
  })

  auth.updateUser.mockResolvedValue()

  auth.syncSession.mockResolvedValue()

  axiosSecure.post.mockResolvedValue({
    data: {},
  })

  renderRegister()

  fillRegisterForm()

  fireEvent.click(
    screen.getByRole(
      'button',
      {
        name:
          'Create Account',
      }
    )
  )

  await waitFor(() => {
    expect(
      auth.createUser
    ).toHaveBeenCalledWith(
      'customer@example.com',
      'Strong@123'
    )
  })

  expect(
    auth.updateUser
  ).toHaveBeenCalledWith(
    expect.objectContaining({
      displayName:
        'Taoshif Gazi',

      photoURL:
        expect.stringContaining(
          'Taoshif%20Gazi'
        ),
    })
  )

  expect(
    auth.syncSession
  ).toHaveBeenCalled()

  expect(
    axiosSecure.post
  ).toHaveBeenCalledWith(
    '/users',
    expect.objectContaining({
      name:
        'Taoshif Gazi',

      phone:
        '01712345678',
    })
  )

  expect(
    mocks.toastSuccess
  ).toHaveBeenCalledWith(
    'Registration successful!'
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


// TC-AUTH-010
test('registers or signs in customer with Google', async () => {
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

  renderRegister()

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
      name:
        'Google User',

      phone:
        '01712345678',

      photoURL:
        'google-photo.jpg',
    }
  )

  expect(
    mocks.toastSuccess
  ).toHaveBeenCalledWith(
    'Logged in with Google!'
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