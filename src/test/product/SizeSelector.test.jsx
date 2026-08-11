import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SizeSelector from '../../components/product/SizeSelector'

// 1.
test('displays all available sizes', () => {
  const sizes = [
    { size: 'S', stock: 5 },
    { size: 'M', stock: 3 },
    { size: 'L', stock: 2 },
  ]

  render(
    <SizeSelector
      sizes={sizes}
      selectedSize={null}
      setSelectedSize={() => {}}
    />
  )

  expect(screen.getByRole('button', { name: 'S' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'M' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'L' })).toBeInTheDocument()
})

// 2.
test('selects a size when a size button is clicked', async () => {
  const setSelectedSize = vi.fn()

  const sizes = [
    { size: 'S', stock: 5 },
    { size: 'M', stock: 3 },
  ]

  render(
    <SizeSelector
      sizes={sizes}
      selectedSize={null}
      setSelectedSize={setSelectedSize}
    />
  )

  await userEvent.click(screen.getByRole('button', { name: 'M' }))

  expect(setSelectedSize).toHaveBeenCalled()
})

// 3.
test('disables an out-of-stock size', () => {
  const sizes = [
    { size: 'S', stock: 0 },
    { size: 'M', stock: 3 },
  ]

  render(
    <SizeSelector
      sizes={sizes}
      selectedSize={null}
      setSelectedSize={() => {}}
    />
  )

  expect(screen.getByRole('button', { name: 'S' })).toBeDisabled()
})

// 4.
test('keeps an in-stock size enabled', () => {
  const sizes = [
    { size: 'M', stock: 3 },
  ]

  render(
    <SizeSelector
      sizes={sizes}
      selectedSize={null}
      setSelectedSize={() => {}}
    />
  )

  expect(screen.getByRole('button', { name: 'M' })).toBeEnabled()
})

// 5.
test('does not select an out-of-stock size', async () => {
  const setSelectedSize = vi.fn()

  const sizes = [
    { size: 'S', stock: 0 },
  ]

  render(
    <SizeSelector
      sizes={sizes}
      selectedSize={null}
      setSelectedSize={setSelectedSize}
    />
  )

  await userEvent.click(screen.getByRole('button', { name: 'S' }))

  expect(setSelectedSize).not.toHaveBeenCalled()
})

// 6.To show product available 
test('shows the selected size as active', () => {
  const sizes = [
    { size: 'S', stock: 5 },
    { size: 'M', stock: 3 },
  ]

  render(
    <SizeSelector
      sizes={sizes}
      selectedSize={sizes[1]}
      setSelectedSize={() => {}}
    />
  )

  expect(screen.getByRole('button', { name: 'M' }))
    .toHaveClass('btn-primary')
})

// 7.
test('selects the correct size object when clicked', async () => {
  const setSelectedSize = vi.fn()

  const sizes = [
    { size: 'S', stock: 5 },
    { size: 'M', stock: 3 },
  ]

  render(
    <SizeSelector
      sizes={sizes}
      selectedSize={null}
      setSelectedSize={setSelectedSize}
    />
  )

  await userEvent.click(screen.getByRole('button', { name: 'M' }))

  expect(setSelectedSize).toHaveBeenCalledWith({
    size: 'M',
    stock: 3,
  })
})

// 8.
test('keeps a non-selected size in normal state', () => {
  const sizes = [
    { size: 'S', stock: 5 },
    { size: 'M', stock: 3 },
  ]

  render(
    <SizeSelector
      sizes={sizes}
      selectedSize={sizes[1]}
      setSelectedSize={() => {}}
    />
  )

  const smallButton = screen.getByRole('button', { name: 'S' })

  expect(smallButton).toHaveClass('btn-outline')
  expect(smallButton).not.toHaveClass('btn-primary')
})