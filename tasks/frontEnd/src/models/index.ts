export type ReviewModel = {
  id: string
  shopName: string
  productName: string
  reviewer: {
    name: string
    email: string
  },
  review: {
    rating: number
    reviewTitle: string
    reviewBody: string
    reviewImages: string[]
    verifiedPurchase: boolean
  }
}

export type ProductModel = {
  id: string
  name: string
  description: string
  price: number
  shopId: string
  shopName: string
  imageUrl?: string
  reviews: ReviewModel[]
}

export type ShopModel = {
  id: string
  shopName: string
  shopDescription?: string
  location?: string
  imageUrl: string
  products: ProductModel[]
}