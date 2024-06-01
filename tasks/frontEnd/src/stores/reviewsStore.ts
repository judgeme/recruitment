import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { createRatingFromFirstDigit } from '@/utils/helper.ts'

type Reviewer = {
  name: stringØ
  email: string
  image: string
  country: stringØ
}

type Review = {
  date: string
  rating: string
  reviewTitle: string
  reviewBody: string
  reviewImages: string[]
  verifiedPurchase: boolean
  published: boolean
}

type ReviewItem = {
  shopName: string
  productName: string
  reviewer: Reviewer
  review: Review
  id: string
}

export const useReviewsStore = defineStore('reviews-store', () => {
  // State
  const reviews = ref<ReviewItem>([])
  const loading = ref(true)
  const errMsg = ref('')

  const sorted = computed(() =>
    reviews.value.sort(
      (a, b) => new Date(b.review.date).getTime() - new Date(a.review.date).getTime()
    )
  )
  const published = computed(() =>
    reviews.value
      .filter((p) => p.review.published)
      .sort((a, b) => new Date(b.review.date).getTime() - new Date(a.review.date).getTime())
  )
  const reviewCount = computed(() => reviews.value.length)

  // Actions
  const getReviews = async () => {
    try {
      const res = await fetch('https://664f5f25ec9b4a4a602e89f9.mockapi.io/reviews')
      const data = await res.json()

      data.items.forEach((review) => {
        review.review.rating = createRatingFromFirstDigit(review.review.rating)
      })

      reviews.value = data.items
      loading.value = false
      console.log('loaded reviews')
    } catch (err) {
      errMsg.value = 'Something went wrong'
      loading.value = false
      console.log(err)
    }
  }

  const getReviewById = async (id: string) => {
    try {
      const res = await fetch(`https://664f5f25ec9b4a4a602e89f9.mockapi.io/reviews/${id}`)
      const data = await res.json()
      console.log('data', data)

      return data
    } catch (err) {
      console.error('Error fetching review by ID:', err)
    }
  }

  const addReview = async (review) => {
    const newReview: ReviewItem = {
      shopName: 'WhiskerWear Pet Store',
      productName: 'WhiskerWear Premium Collar',
      reviewer: {
        name: review.name,
        email: review.email,
        image: '',
        country: 'United Kingdom'
      },
      review: {
        date: new Date().toISOString(),
        rating: String(review.rating),
        reviewTitle: review.reviewTitle,
        reviewBody: review.reviewBody,
        reviewImages: review.reviewImages.map((file) => URL.createObjectURL(file)),
        verifiedPurchase: false,
        published: false
      }
    }

    try {
      const response = await fetch('https://664f5f25ec9b4a4a602e89f9.mockapi.io/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        console.log('Error:', errorResponse)
        throw new Error('Failed to submit review')
      }

      const createdReview = await response.json()
      reviews.value.push(createdReview)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteReview = async (id) => {
    loading.value = true
    reviews.value = reviews.value.filter((p) => p.id !== id)

    try {
      await fetch(`https://664f5f25ec9b4a4a602e89f9.mockapi.io/reviews/${id}`, {
        method: 'DELETE'
      })
      loading.value = false
    } catch (err) {
      console.log(err)
      loading.value = false
    }
  }

  const updateReview = async (updatedReview) => {
    loading.value = true

    try {
      const response = await fetch(
        `https://664f5f25ec9b4a4a602e89f9.mockapi.io/reviews/${updatedReview.id}`,
        {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(updatedReview)
        }
      )

      if (!response.ok) {
        const errorResponse = await response.json()
        console.log('Error:', errorResponse)
        throw new Error('Failed to update review')
        loading.value = false
      }
      loading.value = false
    } catch (err) {
      console.log(err)
      loading.value = false
    }
  }

  const publishReview = async (id) => {
    console.log('publising', id)

    const review = reviews.value.find((p) => p.id === id)
    review.review.published = !review.review.published

    try {
      const response = await fetch(`https://664f5f25ec9b4a4a602e89f9.mockapi.io/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(review)
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        console.log('Error:', errorResponse)
        throw new Error('Failed to update review')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return {
    reviews,
    loading,
    errMsg,
    sorted,
    published,
    getReviews,
    addReview,
    deleteReview,
    updateReview,
    publishReview,
    reviewCount,
    getReviewById
  }
})

