class Shop < ApplicationRecord
  DEFAULT_TAGS = ['default']

  has_many :products
  has_many :reviews, through: :products

  scope :with_reviews, lambda {
    joins(products: :reviews).distinct
  }
end
