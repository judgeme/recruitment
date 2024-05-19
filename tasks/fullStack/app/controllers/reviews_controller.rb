class ReviewsController < ApplicationController

  helper_method :product

  def index
    if params[:shop_id].present? && Shop.where("id = #{params[:shop_id]}").present?
      params[:per_page] ||= 10
      offset = params[:page].to_i * params[:per_page]

      @data = []
      products = Product.where("shop_id = #{params[:shop_id]}").sort_by(&:created_at)[offset..(offset + params[:per_page])]
      products.each do |product|
        reviews = product.reviews.sort_by(&:created_at)[offset..(offset + params[:per_page])]
        @data << { product: product, reviews: reviews }
      end
    end
  end

  def new
  end

  def create
    CreateReviewWorker.perform_async(create_params.to_h)
    flash[:notice] = 'Review is being created in background. It might take a moment to show up'
    redirect_to action: :index, shop_id: product.shop_id
  end

  private

  def product
    @product ||= Product.find(params[:product_id] || create_params[:product_id])
  end

  def create_params
    @create_params ||= params.require(:review).permit(
      :product_id,
      :rating,
      :reviewer_name,
      :body
    )
  end

end
