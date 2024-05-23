# frozen_string_literal: true

class Review < ApplicationRecord
  belongs_to :product

  scope :by_shop, ->(shop) { joins(product: :shop).where(shops: { id: shop }) }

  scope :before_date, lambda { |date|
    table = Review.arel_table
    condition = table[:created_at].lteq(date.end_of_month)

    where(condition)
  }

  scope :by_product, ->(product) { where(product_id: product.id) }
end
