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
    @review = Review.new(review_params.merge(tags: tags_with_default(params)))
    CreateReviewJob.perform_now(@review)
    redirect_to action: :index
  end

  private

  def review_params
    params.require(:review).permit(:product_id, :reviewer_name, :body, :rating)
  end

  # Prepend `params[:tags]` with tags of the shop (if present) or DEFAULT_TAGS
  # For simplicity, let's skip the frontend for `tags`, and just assume frontend can somehow magically send to backend `params[:tags]` as a comma-separated string
  # The logic/requirement of tags is that:
  #  - A review can have `tags` (for simplicity, tags are just an array of strings)
  #  - If the shop has some `tags`, those tags of the shop should be part of the review's `tags`
  #  - Else (if the shop doesn't have any `tags`), the default tags (in constant `DEFAULT_TAGS`) should be part of the review's `tags`
  # One may wonder what an odd logic and lenthy comment, thus may suspect something hidden here, an easter egg perhaps.
  def tags_with_default(params)
    review = params[:review]
    product = Product.find_by(id: review[:product_id])
    default_tags = product.shop.tags || DEFAULT_TAGS
    default_tags.concat(review[:tags].split(',')).uniq
  end
end
