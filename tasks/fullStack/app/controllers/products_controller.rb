class ProductsController < ApplicationController
  def search
    @products = Product.where('title ILIKE ?', "%#{params[:q]}%").limit(30)
    render json: { items: @products.as_json(only: [:id, :title]) }
  end
end
