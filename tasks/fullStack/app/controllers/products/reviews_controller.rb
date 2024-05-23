module Products
  class ReviewsController < ApplicationController
    before_action :set_product, only: %i[index new create]

    def index
      reviews = Review.by_product(@product).order(created_at: :asc)
      pagy, reviews = pagy(reviews, items: 3)

      render locals: {
        reviews: reviews,
        pagy: pagy
      }
    end

    def new
      create_review_form = Forms::CreateReviewForm.new(
        product: @product,
        params: {}
      )

      render locals: {
        product: @product,
        create_review_form: create_review_form
      }
    end

    def create
      create_review_form = Forms::CreateReviewForm.new(
        product: @product,
        params: review_params
      )

      if create_review_form.valid?
        flash[:notice] = <<~MSG
          Review is being created in background. It might take a moment to show up
        MSG

        CreateReviewJob.perform_later(@product, review_params)
      else
        render(
          :new,
          locals: {
            product: @product,
            create_review_form: create_review_form
          },
          status: :unprocessable_entity
        )
      end
    end

    private

    def set_product
      @product = Product.find(params[:product_id])
    end

    def review_params
      params
        .require(:forms_create_review_form)
        .permit(:body, :rating, :reviewer_name)
    end
  end
end
