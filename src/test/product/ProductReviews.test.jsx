import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ProductReviews from '../../components/product/ProductReviews'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'


vi.mock('../../hooks/useAxiosSecure', () => ({
  default: vi.fn(),
}))

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))


let mockAxios


beforeEach(() => {
  vi.clearAllMocks()

  mockAxios = {
    get: vi.fn().mockResolvedValue({
      data: {
        reviews: [],
        averageRating: 0,
        reviewCount: 0,
      },
    }),

    post: vi.fn(),
  }

  useAxiosSecure.mockReturnValue(mockAxios)
})


// TC-PROD-038
test('loads and displays product reviews with rating summary', async () => {
  mockAxios.get.mockResolvedValueOnce({
    data: {
      averageRating: 4.5,
      reviewCount: 2,
      reviews: [
        {
          _id: 'review-1',
          customerName: 'Rahim',
          rating: 5,
          comment: 'Excellent shirt quality.',
        },
        {
          _id: 'review-2',
          customerName: 'Karim',
          rating: 4,
          comment: 'Very comfortable to wear.',
        },
      ],
    },
  })

  render(
    <ProductReviews
      productId="product-1"
      productTitle="Premium Shirt"
    />
  )

  expect(
    await screen.findByText('Rahim')
  ).toBeInTheDocument()

  expect(
    screen.getByText('Excellent shirt quality.')
  ).toBeInTheDocument()

  expect(
    screen.getByText('Karim')
  ).toBeInTheDocument()

  expect(
    screen.getByText('Very comfortable to wear.')
  ).toBeInTheDocument()

  expect(
    screen.getByText('4.5')
  ).toBeInTheDocument()

  expect(
    screen.getByText('2 reviews')
  ).toBeInTheDocument()

  expect(mockAxios.get).toHaveBeenCalledWith(
    '/reviews/product/product-1'
  )
})


// TC-PROD-039
test('shows no reviews message when the product has no reviews', async () => {
  render(
    <ProductReviews
      productId="product-1"
      productTitle="Premium Shirt"
    />
  )

  expect(
    await screen.findByText('No reviews yet')
  ).toBeInTheDocument()

  expect(
    screen.getByText(
      'Be the first to share your experience with this product.'
    )
  ).toBeInTheDocument()

  expect(
    screen.getByText('0 reviews')
  ).toBeInTheDocument()
})


// TC-PROD-040
test('opens and closes the review form', async () => {
  render(
    <ProductReviews
      productId="product-1"
      productTitle="Premium Shirt"
    />
  )

  await screen.findByText('No reviews yet')

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Write a Review',
    })
  )

  expect(
    screen.getByRole('heading', {
      name: 'Review Premium Shirt',
    })
  ).toBeInTheDocument()

  expect(
    screen.getByPlaceholderText('Enter your name')
  ).toBeInTheDocument()

  expect(
    screen.getByRole('button', {
      name: 'Submit Review',
    })
  ).toBeInTheDocument()

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Cancel',
    })
  )

  expect(
    screen.queryByRole('heading', {
      name: 'Review Premium Shirt',
    })
  ).not.toBeInTheDocument()
})


// TC-PROD-041
test('prevents review submission when customer name is empty', async () => {
  render(
    <ProductReviews
      productId="product-1"
      productTitle="Premium Shirt"
    />
  )

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Write a Review',
    })
  )

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Submit Review',
    })
  )

  expect(toast.error).toHaveBeenCalledWith(
    'Please enter your name'
  )

  expect(mockAxios.post).not.toHaveBeenCalled()
})


// TC-PROD-042
test('prevents submission when review comment is too short', async () => {
  render(
    <ProductReviews
      productId="product-1"
      productTitle="Premium Shirt"
    />
  )

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Write a Review',
    })
  )

  await userEvent.type(
    screen.getByPlaceholderText('Enter your name'),
    'Rahim'
  )

  await userEvent.type(
    screen.getByPlaceholderText(
      'Tell us about the quality, fitting, comfort or your overall experience...'
    ),
    'Bad'
  )

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Submit Review',
    })
  )

  expect(toast.error).toHaveBeenCalledWith(
    'Please write a review'
  )

  expect(mockAxios.post).not.toHaveBeenCalled()
})


// TC-PROD-043
test('submits a review with the selected rating and correct information', async () => {
  mockAxios.post.mockResolvedValueOnce({
    data: {
      message:
        'Review submitted successfully. It will appear after approval.',
    },
  })

  render(
    <ProductReviews
      productId="product-1"
      productTitle="Premium Shirt"
    />
  )

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Write a Review',
    })
  )

  await userEvent.type(
    screen.getByPlaceholderText('Enter your name'),
    'Rahim'
  )

  await userEvent.click(
    screen.getByRole('button', {
      name: '4 star rating',
    })
  )

  expect(
    screen.getByText('4/5')
  ).toBeInTheDocument()

  await userEvent.type(
    screen.getByPlaceholderText(
      'Tell us about the quality, fitting, comfort or your overall experience...'
    ),
    'Very comfortable shirt.'
  )

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Submit Review',
    })
  )

  await waitFor(() => {
    expect(mockAxios.post).toHaveBeenCalledWith(
      '/reviews',
      {
        productId: 'product-1',
        customerName: 'Rahim',
        rating: 4,
        comment: 'Very comfortable shirt.',
      }
    )
  })

  expect(toast.success).toHaveBeenCalledWith(
    'Review submitted successfully. It will appear after approval.'
  )

  await waitFor(() => {
    expect(
      screen.queryByRole('heading', {
        name: 'Review Premium Shirt',
      })
    ).not.toBeInTheDocument()
  })
})


// TC-PROD-044
test('shows server error when review submission fails', async () => {
  mockAxios.post.mockRejectedValueOnce({
    response: {
      data: {
        message: 'Failed to submit review',
      },
    },
  })

  render(
    <ProductReviews
      productId="product-1"
      productTitle="Premium Shirt"
    />
  )

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Write a Review',
    })
  )

  await userEvent.type(
    screen.getByPlaceholderText('Enter your name'),
    'Rahim'
  )

  await userEvent.type(
    screen.getByPlaceholderText(
      'Tell us about the quality, fitting, comfort or your overall experience...'
    ),
    'Good quality product.'
  )

  await userEvent.click(
    screen.getByRole('button', {
      name: 'Submit Review',
    })
  )

  await waitFor(() => {
    expect(toast.error).toHaveBeenCalledWith(
      'Failed to submit review'
    )
  })
})


// TC-PROD-045
test('handles review loading failure without breaking the page', async () => {
  mockAxios.get.mockRejectedValueOnce(
    new Error('Failed to load reviews')
  )

  render(
    <ProductReviews
      productId="product-1"
      productTitle="Premium Shirt"
    />
  )

  expect(
    await screen.findByText('No reviews yet')
  ).toBeInTheDocument()

  expect(
    screen.getByText('0 reviews')
  ).toBeInTheDocument()
})