class ReviewsController < ApplicationController

  DEFAULT_TAGS = ['default']
  REVIEWS_PER_PAGE = 3

  def index
    params[:per_page] ||= 10
    params[:page] ||= 1
    offset = (params[:page].to_i - 1) * params[:per_page].to_i

    @data = []

    products_query = Product.all
    products_query = products_query.where(shop_id: params[:shop_id]) if params[:shop_id].present?
    products_query = products_query.order(created_at: :asc)

    products = products_query.includes(:reviews).limit(params[:per_page]).offset(offset)

    products.each do |product|
      product_reviews_page_data = params[:product_reviews_page_data] || {}
      page = product_reviews_page_data[product.id.to_s]&.to_i || 1
      reviews = product.reviews.order(created_at: :desc).limit(REVIEWS_PER_PAGE).offset((page.to_i - 1) * REVIEWS_PER_PAGE)
      @data << { product: product, reviews: reviews, total_pages: (product.reviews.size/REVIEWS_PER_PAGE).ceil, page: page }
    end
  end

  def update_reviews
    @product = Product.find(params[:id])
    page = params[:page].to_i
    @reviews = @product.reviews.order(created_at: :desc).limit(REVIEWS_PER_PAGE).offset((page - 1) * REVIEWS_PER_PAGE)
    respond_to do |format|
      format.js
    end
  end

  def create
    # TODO: Create reviews in background. No need to show errors (if any) to users, it's fine to skip creating the review silently when some validations fail.

    tags = tags_with_default(params)
    Review.create(product_id: params[:product_id], body: params[:body], rating: params[:rating], reviewer_name: params[:reviewer_name], tags: tags)

    flash[:notice] = 'Review is being created in background. It might take a moment to show up'
    redirect_to action: :index, shop_id: Product.find_by(id: params[:product_id]).shop_id
  end

  private

  # Prepend `params[:tags]` with tags of the shop (if present) or DEFAULT_TAGS
  # For simplicity, let's skip the frontend for `tags`, and just assume frontend can somehow magically send to backend `params[:tags]` as a comma-separated string
  # The logic/requirement of tags is that:
  #  - A review can have `tags` (for simplicity, tags are just an array of strings)
  #  - If the shop has some `tags`, those tags of the shop should be part of the review's `tags`
  #  - Else (if the shop doesn't have any `tags`), the default tags (in constant `DEFAULT_TAGS`) should be part of the review's `tags`
  # One may wonder what an odd logic and lenthy comment, thus may suspect something hidden here, an easter egg perhaps.
  def tags_with_default(params)
    product = Product.find_by(id: params[:product_id])
    default_tags = product.shop.tags || DEFAULT_TAGS
    default_tags.concat(params[:tags].split(',')).uniq
  end

end
