import { render, screen } from '@testing-library/react'
import ProductDescription from '../../components/product/ProductDescription'

test('displays the product description correctly', () => {
  const description = 'Premium cotton shirt with a comfortable fit.'

  render(
    <ProductDescription description={description} />
  )

  expect(
    screen.getByRole('heading', { name: 'Product Description' })
  ).toBeInTheDocument()

  expect(
    screen.getByText(description)
  ).toBeInTheDocument()
})