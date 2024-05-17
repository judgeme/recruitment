# frozen_string_literal: true

class Review < ApplicationRecord
  belongs_to :product

  scope :by_shop, ->(shop) { joins(product: :shop).where(shops: { id: shop }) }
end
