class Review < ApplicationRecord
  belongs_to :product

  validates :rating, presence: true, numericality: { greater_than_or_equal_to: 1.0, less_than_or_equal_to: 5.0 }
  validates :body, presence: true
  validates :reviewer_name, presence: true
  validates :product_id, presence: true
end
