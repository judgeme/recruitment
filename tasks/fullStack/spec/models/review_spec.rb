# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Review, type: :model do
  describe 'associations' do
    it { is_expected.to belong_to(:product) }
  end

  describe '.by_shop' do
    it 'returns only review by shop_id' do
      shop = create(:shop)
      product1 = build(:product, shop: shop)
      review1 = create(:review, product: product1)
      product2 = build(:product)
      review2 = create(:review, product: product2)

      expect(Review.by_shop(shop)).to include(review1)
      expect(Review.by_shop(shop)).not_to include(review2)
    end
  end
end
