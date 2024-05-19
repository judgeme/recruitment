# frozen_string_literal: true

class ProductsController < ApplicationController
  def index
    @q = Product.ransack(params[:q])
    pagy, products = pagy(@q.result(distinct: true), items: 10)

    render locals: {
      shops: shops,
      products: products,
      pagy: pagy
    }
  end

  private

  def search_params
    params.permit(
      :format,
      :commit,
      q: %i[shop_id_eq]
    )
  end

  def shops
    @shops ||= Shop.all.order(name: :asc)
  end
end
