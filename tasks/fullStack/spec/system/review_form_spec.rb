require 'rails_helper'

RSpec.describe "Review form", type: :system do
  before do
    driven_by(:rack_test)
  end

  context 'for a given product' do
    let(:shop) { create :shop, name: 'My Cool Shop' }

    subject { create :product, title: 'My Cool Product', shop: shop }

    it 'allows me to leave a review' do
      visit new_review_path(product_id: subject.id)

      expect(page).to have_text('My Cool Shop')
      expect(page).to have_text('My Cool Product')
    end
  end
end
