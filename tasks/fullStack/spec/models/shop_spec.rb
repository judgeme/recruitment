# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Shop, type: :model do
  describe 'associations' do
    it { is_expected.to have_many(:products) }
    it { is_expected.to have_many(:reviews).through(:products) }
  end

  describe '.with_reviews' do
    it 'returns only shops that have reviews' do
      shop1 = create(:shop)
      shop2 = create(:shop)
      shop3 = create(:shop)

      create(:product, :with_reviews, shop: shop1)
      create(:product, :with_reviews, shop: shop3)

      scope = Shop.with_reviews

      expect(scope).to include(shop1, shop3)
      expect(scope).not_to include(shop2)
    end
  end
end
