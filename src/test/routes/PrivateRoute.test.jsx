import { render, screen } from '@testing-library/react'
import {
  MemoryRouter,
  Route,
  Routes,
} from 'react-router'

import PrivateRoute from '../../routes/PrivateRoute'
import useAuth from '../../hooks/useAuth'


vi.mock('../../hooks/useAuth', () => ({
  default: vi.fn(),
}))


const renderPrivateRoute = () => {
  return render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <div>Protected Content</div>
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={<div>Login Page</div>}
        />
      </Routes>
    </MemoryRouter>
  )
}


beforeEach(() => {
  vi.clearAllMocks()
})


// TC-ROUTE-001
test('shows loading spinner while authentication is loading', () => {
  useAuth.mockReturnValue({
    user: null,
    loading: true,
  })

  const { container } =
    renderPrivateRoute()

  expect(
    container.querySelector(
      '.loading-spinner'
    )
  ).toBeInTheDocument()
})


// TC-ROUTE-002
test('redirects unauthenticated user to login page', () => {
  useAuth.mockReturnValue({
    user: null,
    loading: false,
  })

  renderPrivateRoute()

  expect(
    screen.getByText('Login Page')
  ).toBeInTheDocument()

  expect(
    screen.queryByText(
      'Protected Content'
    )
  ).not.toBeInTheDocument()
})


// TC-ROUTE-003
test('allows authenticated user to access protected content', () => {
  useAuth.mockReturnValue({
    user: {
      email: 'customer@example.com',
    },
    loading: false,
  })

  renderPrivateRoute()

  expect(
    screen.getByText(
      'Protected Content'
    )
  ).toBeInTheDocument()
})