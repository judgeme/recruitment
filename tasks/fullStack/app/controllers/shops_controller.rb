class ShopsController < ApplicationController
  before_action :set_shop, only: :show

  def show
    render locals: {
      shop: @shop
    }
  end

  private

  def set_shop
    @shop = Shop.find(params[:id])
  end
end
