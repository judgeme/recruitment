class ReviewsController < ApplicationController

  DEFAULT_TAGS = ['default']

  def index
    @data = []
    # Hardcode shop_id for now. Will only work for shop with ID 1
    products = Product.where(:shop_id=>1).includes(:reviews).all
    @pagy, @data = pagy((products), items: 5)
  end

  def new
    @review = Review.new
  end

  def create
    @review = Review.new(review_params)
    CreateReviewJob.perform_now(@review)
    redirect_to action: :index
  end

  private

  def review_params
    params.require(:review).permit(:product_id, :reviewer_name, :body, :rating)
  end

end
