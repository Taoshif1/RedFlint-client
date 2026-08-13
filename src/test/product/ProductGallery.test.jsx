import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductGallery from '../../components/product/ProductGallery'


// TC-PROD-016
test('shows the first product image as the main image by default', () => {
  const images = [
    'shirt-front.jpg',
    'shirt-back.jpg',
    'shirt-side.jpg',
  ]

  render(
    <ProductGallery
      images={images}
      title="Premium Shirt"
      season="Summer"
      category="Shirt"
      isFeatured={false}
      isSpecial={false}
    />
  )

  const mainImage = screen.getByAltText('Premium Shirt')

  expect(mainImage).toHaveAttribute('src', 'shirt-front.jpg')
})

// TC-PROD-017
test('changes the main image when a thumbnail is clicked', async () => {
  const images = [
    'shirt-front.jpg',
    'shirt-back.jpg',
    'shirt-side.jpg',
  ]

  render(
    <ProductGallery
      images={images}
      title="Premium Shirt"
      season="Summer"
      category="Shirt"
      isFeatured={false}
      isSpecial={false}
    />
  )

  const mainImage = screen.getByAltText('Premium Shirt')
  const secondThumbnail = screen.getByAltText('Premium Shirt 2')

  await userEvent.click(secondThumbnail)

  expect(mainImage).toHaveAttribute('src', 'shirt-back.jpg')
})

// TC-PROD-018
test('displays thumbnails for all product images', () => {
  const images = [
    'shirt-front.jpg',
    'shirt-back.jpg',
    'shirt-side.jpg',
  ]

  render(
    <ProductGallery
      images={images}
      title="Premium Shirt"
      season="Summer"
      category="Shirt"
      isFeatured={false}
      isSpecial={false}
    />
  )

  expect(screen.getByAltText('Premium Shirt 1')).toBeInTheDocument()
  expect(screen.getByAltText('Premium Shirt 2')).toBeInTheDocument()
  expect(screen.getByAltText('Premium Shirt 3')).toBeInTheDocument()
})


// TC-PROD-019
test('displays Featured badge for a featured product', () => {
  const images = [
    'shirt-front.jpg',
  ]

  render(
    <ProductGallery
      images={images}
      title="Premium Shirt"
      season="Summer"
      category="Shirt"
      isFeatured={true}
      isSpecial={false}
    />
  )

  expect(screen.getByText('Featured')).toBeInTheDocument()
})

// TC-PROD-020
test('displays Special Edition badge for a special product', () => {
  const images = [
    'shirt-front.jpg',
  ]

  render(
    <ProductGallery
      images={images}
      title="Premium Shirt"
      season="Summer"
      category="Shirt"
      isFeatured={false}
      isSpecial={true}
    />
  )

  expect(screen.getByText('Special Edition')).toBeInTheDocument()
})

// TC-PROD-021
test('displays the product season and category', () => {
  const images = [
    'shirt-front.jpg',
  ]

  render(
    <ProductGallery
      images={images}
      title="Premium Shirt"
      season="Summer"
      category="Shirt"
      isFeatured={false}
      isSpecial={false}
    />
  )

  expect(screen.getByText('Summer')).toBeInTheDocument()
  expect(screen.getByText('Shirt')).toBeInTheDocument()
})

// TC-PROD-022
test('does not display Featured badge for a non-featured product', () => {
  const images = [
    'shirt-front.jpg',
  ]

  render(
    <ProductGallery
      images={images}
      title="Premium Shirt"
      season="Summer"
      category="Shirt"
      isFeatured={false}
      isSpecial={false}
    />
  )

  expect(screen.queryByText('Featured')).not.toBeInTheDocument()
})

// TC-PROD-023
test('moves the selected highlight to the clicked thumbnail', async () => {
  const images = [
    'shirt-front.jpg',
    'shirt-back.jpg',
  ]

  render(
    <ProductGallery
      images={images}
      title="Premium Shirt"
      season="Summer"
      category="Shirt"
      isFeatured={false}
      isSpecial={false}
    />
  )

  const firstThumbnail = screen.getByAltText('Premium Shirt 1')
  const secondThumbnail = screen.getByAltText('Premium Shirt 2')

  const firstButton = firstThumbnail.closest('button')
  const secondButton = secondThumbnail.closest('button')

  expect(firstButton).toHaveClass('border-primary')

  await userEvent.click(secondThumbnail)

  expect(secondButton).toHaveClass('border-primary')
  expect(firstButton).not.toHaveClass('border-primary')
})

// TC-PROD-024
test('does not display Special Edition badge for a normal product', () => {
  const images = ['shirt-front.jpg']

  render(
    <ProductGallery
      images={images}
      title="Premium Shirt"
      season="Summer"
      category="Shirt"
      isFeatured={false}
      isSpecial={false}
    />
  )

  expect(
    screen.queryByText('Special Edition')
  ).not.toBeInTheDocument()
})


// TC-PROD-025
test('displays both Featured and Special Edition badges together', () => {
  const images = ['shirt-front.jpg']

  render(
    <ProductGallery
      images={images}
      title="Premium Shirt"
      season="Summer"
      category="Shirt"
      isFeatured={true}
      isSpecial={true}
    />
  )

  expect(screen.getByText('Featured')).toBeInTheDocument()
  expect(screen.getByText('Special Edition')).toBeInTheDocument()
})


// TC-PROD-026
test('uses the product title as the main image alternative text', () => {
  const images = ['shirt-front.jpg']

  render(
    <ProductGallery
      images={images}
      title="Premium Shirt"
      season="Summer"
      category="Shirt"
      isFeatured={false}
      isSpecial={false}
    />
  )

  const mainImage = screen.getByAltText('Premium Shirt')

  expect(mainImage).toBeInTheDocument()
})


// TC-PROD-027
test('works correctly when only one product image is available', () => {
  const images = ['shirt-front.jpg']

  render(
    <ProductGallery
      images={images}
      title="Premium Shirt"
      season="Summer"
      category="Shirt"
      isFeatured={false}
      isSpecial={false}
    />
  )

  const mainImage = screen.getByAltText('Premium Shirt')
  const thumbnail = screen.getByAltText('Premium Shirt 1')

  expect(mainImage).toHaveAttribute('src', 'shirt-front.jpg')
  expect(thumbnail).toHaveAttribute('src', 'shirt-front.jpg')
})