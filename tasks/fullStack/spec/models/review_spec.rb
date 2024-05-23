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

  describe '.before_date' do
    before { travel_to(Time.zone.local(2023, 10, 17, 7, 24)) }
    after { travel_back }

    it 'returns only reviews before specified date month' do
      review1 = create(:review, created_at: 1.month.ago)
      review2 = create(:review, created_at: 1.month.ago + 2.days)
      review3 = create(:review, created_at: 1.day.ago)

      scope = Review.before_date(1.month.ago)

      expect(scope).to include(review1, review2)
      expect(scope).not_to include(review3)
    end
  end

  describe '.by_product' do
    it 'returns reviews by product' do
      product = create(:product)
      review1 = create(:review, product: product)
      review2 = create(:review)
      review3 = create(:review)

      scope = Review.by_product(product)

      expect(scope).to include(review1)
      expect(scope).not_to include(review2, review3)
    end
  end
end
