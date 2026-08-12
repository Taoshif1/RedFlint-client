import { render, screen } from '@testing-library/react'
import {
  MemoryRouter,
  Route,
  Routes,
} from 'react-router'

import AdminRoute from '../../routes/AdminRoute'

import useAuth from '../../hooks/useAuth'
import useUser from '../../hooks/useUser'


vi.mock('../../hooks/useAuth', () => ({
  default: vi.fn(),
}))


vi.mock('../../hooks/useUser', () => ({
  default: vi.fn(),
}))


const renderAdminRoute = () => {
  return render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <div>Admin Content</div>
            </AdminRoute>
          }
        />

        <Route
          path="/login"
          element={<div>Login Page</div>}
        />

        <Route
          path="/"
          element={<div>Home Page</div>}
        />
      </Routes>
    </MemoryRouter>
  )
}


let consoleLogSpy


beforeEach(() => {
  vi.clearAllMocks()

  consoleLogSpy = vi
    .spyOn(console, 'log')
    .mockImplementation(() => {})
})


afterEach(() => {
  consoleLogSpy.mockRestore()
})


// TC-ROUTE-004
test('shows loading spinner while admin authentication is loading', () => {
  useAuth.mockReturnValue({
    user: null,
    loading: true,
  })

  useUser.mockReturnValue({
    user: null,
    loading: true,
  })

  const { container } = renderAdminRoute()

  expect(
    container.querySelector('.loading-spinner')
  ).toBeInTheDocument()
})


// TC-ROUTE-005
test('redirects unauthenticated user to login page', () => {
  useAuth.mockReturnValue({
    user: null,
    loading: false,
  })

  useUser.mockReturnValue({
    user: null,
    loading: false,
  })

  renderAdminRoute()

  expect(
    screen.getByText('Login Page')
  ).toBeInTheDocument()
})


// TC-ROUTE-006
test('redirects user to home when database user does not exist', () => {
  useAuth.mockReturnValue({
    user: {
      email: 'user@example.com',
    },
    loading: false,
  })

  useUser.mockReturnValue({
    user: null,
    loading: false,
  })

  renderAdminRoute()

  expect(
    screen.getByText('Home Page')
  ).toBeInTheDocument()

  expect(
    screen.queryByText(
      'Admin Content'
    )
  ).not.toBeInTheDocument()
})


// TC-ROUTE-007
test('blocks authenticated non-admin user from admin route', () => {
  useAuth.mockReturnValue({
    user: {
      email: 'customer@example.com',
    },
    loading: false,
  })

  useUser.mockReturnValue({
    user: {
      email: 'customer@example.com',
      role: 'customer',
    },
    loading: false,
  })

  renderAdminRoute()

  expect(
    screen.getByText('Home Page')
  ).toBeInTheDocument()

  expect(
    screen.queryByText(
      'Admin Content'
    )
  ).not.toBeInTheDocument()
})


// TC-ROUTE-008
test('allows admin user to access admin content', () => {
  useAuth.mockReturnValue({
    user: {
      email: 'admin@example.com',
    },
    loading: false,
  })

  useUser.mockReturnValue({
    user: {
      email: 'admin@example.com',
      role: 'admin',
    },
    loading: false,
  })

  renderAdminRoute()

  expect(
    screen.getByText(
      'Admin Content'
    )
  ).toBeInTheDocument()
})