class Product < ApplicationRecord
  belongs_to :shop
  has_many :reviews

  def self.ransackable_attributes(_auth_object = nil)
    %w[id shop_id]
  end
end
