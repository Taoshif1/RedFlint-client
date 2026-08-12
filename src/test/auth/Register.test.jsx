// import {
//   render,
//   screen,
//   waitFor,
// } from '@testing-library/react'

// import userEvent from '@testing-library/user-event'

// import {
//   MemoryRouter,
//   useNavigate,
// } from 'react-router'

// import Register from '../../pages/Register'
// import useAuth from '../../hooks/useAuth'
// import useAxiosSecure from '../../hooks/useAxiosSecure'
// import toast from 'react-hot-toast'


// vi.mock('../../hooks/useAuth', () => ({
//   default: vi.fn(),
// }))

// vi.mock('../../hooks/useAxiosSecure', () => ({
//   default: vi.fn(),
// }))

// vi.mock('react-hot-toast', () => ({
//   default: {
//     success: vi.fn(),
//     error: vi.fn(),
//   },
// }))

// vi.mock('react-router', async () => {
//   const actual = await vi.importActual('react-router')

//   return {
//     ...actual,
//     useNavigate: vi.fn(),
//   }
// })


// let mockCreateUser
// let mockUpdateUser
// let mockGoogleSignIn
// let mockSyncSession
// let mockNavigate
// let mockAxios


// beforeEach(() => {
//   vi.clearAllMocks()

//   mockCreateUser = vi.fn()
//   mockUpdateUser = vi.fn().mockResolvedValue({})
//   mockGoogleSignIn = vi.fn()
//   mockSyncSession = vi.fn().mockResolvedValue({})
//   mockNavigate = vi.fn()

//   mockAxios = {
//     post: vi.fn().mockResolvedValue({}),
//   }

//   useAuth.mockReturnValue({
//     createUser: mockCreateUser,
//     updateUser: mockUpdateUser,
//     googleSignIn: mockGoogleSignIn,
//     syncSession: mockSyncSession,
//   })

//   useAxiosSecure.mockReturnValue(mockAxios)

//   useNavigate.mockReturnValue(mockNavigate)
// })


// const renderRegister = () => {
//   return render(
//     <MemoryRouter>
//       <Register />
//     </MemoryRouter>
//   )
// }


// const fillRegistrationForm = async ({
//   name = 'Rahim Ahmed',
//   phone = '01700000000',
//   email = 'rahim@example.com',
//   password = 'Strong@123',
//   confirm = 'Strong@123',
// } = {}) => {
//   await userEvent.type(
//     screen.getByPlaceholderText('Full Name'),
//     name
//   )

//   await userEvent.type(
//     screen.getByPlaceholderText('Phone Number'),
//     phone
//   )

//   await userEvent.type(
//     screen.getByPlaceholderText('Email Address'),
//     email
//   )

//   await userEvent.type(
//     screen.getByPlaceholderText('Password'),
//     password
//   )

//   await userEvent.type(
//     screen.getByPlaceholderText('Confirm Password'),
//     confirm
//   )
// }


// // TC-AUTH-007
// test('prevents registration when passwords do not match', async () => {
//   renderRegister()

//   await fillRegistrationForm({
//     password: 'Strong@123',
//     confirm: 'Strong@456',
//   })

//   await userEvent.click(
//     screen.getByRole('button', {
//       name: 'Create Account',
//     })
//   )

//   expect(toast.error).toHaveBeenCalledWith(
//     'Passwords do not match.'
//   )

//   expect(mockCreateUser).not.toHaveBeenCalled()
// })


// // TC-AUTH-008
// test('prevents registration when password is shorter than six characters', async () => {
//   renderRegister()

//   await fillRegistrationForm({
//     password: 'Aa@12',
//     confirm: 'Aa@12',
//   })

//   await userEvent.click(
//     screen.getByRole('button', {
//       name: 'Create Account',
//     })
//   )

//   expect(toast.error).toHaveBeenCalledWith(
//     'Password must be at least 6 characters.'
//   )

//   expect(mockCreateUser).not.toHaveBeenCalled()
// })


// // TC-AUTH-009
// test('requires at least one uppercase letter in password', async () => {
//   renderRegister()

//   await fillRegistrationForm({
//     password: 'strong@123',
//     confirm: 'strong@123',
//   })

//   await userEvent.click(
//     screen.getByRole('button', {
//       name: 'Create Account',
//     })
//   )

//   expect(toast.error).toHaveBeenCalledWith(
//     'Password must contain one uppercase letter.'
//   )

//   expect(mockCreateUser).not.toHaveBeenCalled()
// })


// // TC-AUTH-010
// test('requires at least one lowercase letter in password', async () => {
//   renderRegister()

//   await fillRegistrationForm({
//     password: 'STRONG@123',
//     confirm: 'STRONG@123',
//   })

//   await userEvent.click(
//     screen.getByRole('button', {
//       name: 'Create Account',
//     })
//   )

//   expect(toast.error).toHaveBeenCalledWith(
//     'Password must contain one lowercase letter.'
//   )

//   expect(mockCreateUser).not.toHaveBeenCalled()
// })


// // TC-AUTH-011
// test('requires at least one special character in password', async () => {
//   renderRegister()

//   await fillRegistrationForm({
//     password: 'Strong123',
//     confirm: 'Strong123',
//   })

//   await userEvent.click(
//     screen.getByRole('button', {
//       name: 'Create Account',
//     })
//   )

//   expect(toast.error).toHaveBeenCalledWith(
//     'Password must contain one special character.'
//   )

//   expect(mockCreateUser).not.toHaveBeenCalled()
// })


// // TC-AUTH-012
// test('registers new customer successfully and redirects to dashboard', async () => {
//   const firebaseUser = {
//     email: 'rahim@example.com',
//   }

//   mockCreateUser.mockResolvedValueOnce({
//     user: firebaseUser,
//   })

//   renderRegister()

//   await fillRegistrationForm()

//   await userEvent.click(
//     screen.getByRole('button', {
//       name: 'Create Account',
//     })
//   )

//   await waitFor(() => {
//     expect(mockCreateUser).toHaveBeenCalledWith(
//       'rahim@example.com',
//       'Strong@123'
//     )
//   })

//   expect(mockUpdateUser).toHaveBeenCalledWith(
//     expect.objectContaining({
//       displayName: 'Rahim Ahmed',
//       photoURL: expect.stringContaining(
//         'Rahim%20Ahmed'
//       ),
//     })
//   )

//   expect(mockSyncSession).toHaveBeenCalledWith(
//     firebaseUser
//   )

//   expect(mockAxios.post).toHaveBeenCalledWith(
//     '/users',
//     {
//       name: 'Rahim Ahmed',
//       phone: '01700000000',
//       photoURL: expect.stringContaining(
//         'Rahim%20Ahmed'
//       ),
//     }
//   )

//   expect(toast.success).toHaveBeenCalledWith(
//     'Registration successful!'
//   )

//   expect(mockNavigate).toHaveBeenCalledWith(
//     '/dashboard',
//     {
//       replace: true,
//     }
//   )
// })


// // TC-AUTH-013
// test('registers and logs in user with Google successfully', async () => {
//   const firebaseUser = {
//     email: 'google@example.com',
//     displayName: 'Google User',
//     phoneNumber: '01800000000',
//     photoURL: 'google-photo.jpg',
//   }

//   mockGoogleSignIn.mockResolvedValueOnce({
//     user: firebaseUser,
//   })

//   renderRegister()

//   await userEvent.click(
//     screen.getByRole('button', {
//       name: /Continue with Google/i,
//     })
//   )

//   await waitFor(() => {
//     expect(mockGoogleSignIn).toHaveBeenCalled()
//   })

//   expect(mockSyncSession).toHaveBeenCalledWith(
//     firebaseUser
//   )

//   expect(mockAxios.post).toHaveBeenCalledWith(
//     '/users',
//     {
//       name: 'Google User',
//       phone: '01800000000',
//       photoURL: 'google-photo.jpg',
//     }
//   )

//   expect(toast.success).toHaveBeenCalledWith(
//     'Logged in with Google!'
//   )

//   expect(mockNavigate).toHaveBeenCalledWith(
//     '/dashboard',
//     {
//       replace: true,
//     }
//   )
// })


// // TC-AUTH-020
// test('prevents registration when email is already registered', async () => {
//   mockCreateUser.mockRejectedValueOnce({
//     code: 'auth/email-already-in-use',
//     message:
//       'Firebase: Error (auth/email-already-in-use).',
//   })

//   renderRegister()

//   await fillRegistrationForm({
//     email: 'existing@example.com',
//   })

//   await userEvent.click(
//     screen.getByRole('button', {
//       name: 'Create Account',
//     })
//   )

//   await waitFor(() => {
//     expect(mockCreateUser).toHaveBeenCalledWith(
//       'existing@example.com',
//       'Strong@123'
//     )

//     expect(toast.error).toHaveBeenCalledWith(
//       'Firebase: Error (auth/email-already-in-use).'
//     )
//   })

//   expect(mockAxios.post).not.toHaveBeenCalled()

//   expect(mockNavigate).not.toHaveBeenCalled()
// })