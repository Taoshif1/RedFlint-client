import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuantitySelector from '../../components/product/QuantitySelector'

// 1
test('shows the current quantity', () => {
  render(<QuantitySelector quantity={2} setQuantity={() => {}} />)

  expect(screen.getByText('2')).toBeInTheDocument()
})

// 2
test('increases quantity when plus button is clicked', async () => {
  const setQuantity = vi.fn()

  render(<QuantitySelector quantity={2} setQuantity={setQuantity} />)

  await userEvent.click(screen.getByRole('button', { name: '+' }))

  expect(setQuantity).toHaveBeenCalled()
})

// 3.
test('decreases quantity when minus button is clicked', async () => {
  const setQuantity = vi.fn()

  render(<QuantitySelector quantity={2} setQuantity={setQuantity} />)

  await userEvent.click(screen.getByRole('button', { name: '−' }))

  expect(setQuantity).toHaveBeenCalled()
})

// 4.
test('does not decrease quantity below 1', async () => {
  let quantity = 1

  const setQuantity = vi.fn((updateFunction) => {
    quantity = updateFunction(quantity)
  })

  render(<QuantitySelector quantity={1} setQuantity={setQuantity} />)

  await userEvent.click(screen.getByRole('button', { name: '−' }))

  expect(quantity).toBe(1)
})

// 5.
test('increases quantity from 2 to 3', async () => {
  let quantity = 2

  const setQuantity = vi.fn((updateFunction) => {
    quantity = updateFunction(quantity)
  })

  render(<QuantitySelector quantity={2} setQuantity={setQuantity} />)

  await userEvent.click(screen.getByRole('button', { name: '+' }))

  expect(quantity).toBe(3)
})

// 6. 
test('decreases quantity from 2 to 1', async () => {
  let quantity = 2

  const setQuantity = vi.fn((updateFunction) => {
    quantity = updateFunction(quantity)
  })

  render(<QuantitySelector quantity={2} setQuantity={setQuantity} />)

  await userEvent.click(screen.getByRole('button', { name: '−' }))

  expect(quantity).toBe(1)
})