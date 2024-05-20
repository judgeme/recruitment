class ReviewsController < ApplicationController

  helper_method :product

  def index
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
