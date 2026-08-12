import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchBar from '../../components/shared/SearchBar'
import { useNavigate } from 'react-router'


vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
}))


let mockNavigate


beforeEach(() => {
  vi.clearAllMocks()

  mockNavigate = vi.fn()

  useNavigate.mockReturnValue(mockNavigate)
})


// TC-SEARCH-001
test('opens the search input and focuses it when the search button is clicked', async () => {
  render(<SearchBar />)

  const searchButton = screen.getByRole('button')
  const searchInput = screen.getByPlaceholderText('Search')

  await userEvent.click(searchButton)

  expect(searchInput).toHaveFocus()

  expect(searchInput).toHaveStyle({
    opacity: '1',
  })
})


// TC-SEARCH-002
test('does not search when the search query is empty', async () => {
  render(<SearchBar />)

  const searchButton = screen.getByRole('button')
  const searchInput = screen.getByPlaceholderText('Search')

  await userEvent.click(searchButton)

  await userEvent.type(searchInput, '   ')

  await userEvent.keyboard('{Enter}')

  expect(mockNavigate).not.toHaveBeenCalled()
})


// TC-SEARCH-003
test('navigates to products page with the entered search query', async () => {
  render(<SearchBar />)

  const searchButton = screen.getByRole('button')
  const searchInput = screen.getByPlaceholderText('Search')

  await userEvent.click(searchButton)

  await userEvent.type(
    searchInput,
    'formal shirt'
  )

  await userEvent.keyboard('{Enter}')

  expect(mockNavigate).toHaveBeenCalledWith(
    '/products?search=formal%20shirt'
  )
})


// TC-SEARCH-009
test('searches when the search icon is clicked after entering a query', async () => {
  render(<SearchBar />)

  const searchButton = screen.getByRole('button')
  const searchInput = screen.getByPlaceholderText('Search')

  await userEvent.click(searchButton)

  await userEvent.type(
    searchInput,
    'polo shirt'
  )

  await userEvent.click(searchButton)

  expect(mockNavigate).toHaveBeenCalledWith(
    '/products?search=polo%20shirt'
  )
})


// TC-SEARCH-010
test('closes the search bar when clicked outside while the query is empty', async () => {
  render(<SearchBar />)

  const searchButton = screen.getByRole('button')
  const searchInput = screen.getByPlaceholderText('Search')

  await userEvent.click(searchButton)

  expect(searchInput).toHaveStyle({
    opacity: '1',
  })

  await userEvent.click(document.body)

  expect(searchInput).toHaveStyle({
    opacity: '0',
  })
})


// TC-SEARCH-011
test('keeps the search bar open when clicked outside if a query exists', async () => {
  render(<SearchBar />)

  const searchButton = screen.getByRole('button')
  const searchInput = screen.getByPlaceholderText('Search')

  await userEvent.click(searchButton)

  await userEvent.type(
    searchInput,
    'shirt'
  )

  await userEvent.click(document.body)

  expect(searchInput).toHaveStyle({
    opacity: '1',
  })

  expect(searchInput).toHaveValue('shirt')
})


// TC-SEARCH-012
test('encodes special characters correctly in the search URL', async () => {
  render(<SearchBar />)

  const searchButton = screen.getByRole('button')
  const searchInput = screen.getByPlaceholderText('Search')

  await userEvent.click(searchButton)

  await userEvent.type(
    searchInput,
    'shirt & tie'
  )

  await userEvent.keyboard('{Enter}')

  expect(mockNavigate).toHaveBeenCalledWith(
    '/products?search=shirt%20%26%20tie'
  )
})