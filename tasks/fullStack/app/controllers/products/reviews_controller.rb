module Products
  class ReviewsController < ApplicationController
    before_action :set_product

    def index
      reviews = Review.by_product(@product).order(created_at: :asc)
      pagy, reviews = pagy(reviews, items: 3)

      render locals: {
        reviews: reviews,
        pagy: pagy
      }
    end

    def new
      # code here
    end

    def create
      # code here
    end

    private

    def set_product
      @product = Product.find(params[:product_id])
    end
  end
end
