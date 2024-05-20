require 'rails_helper'

RSpec.describe "Review index", type: :system do
  before do
    driven_by(:rack_test)
  end

  context 'for a given shop' do
    let(:shop) { create :shop, name: 'My Cool Shop' }

    setup do
      create :product, shop: shop, title: 'Oldest'
      create :product, shop: shop, title: 'Middle'
      create :product, shop: shop, title: 'Youngest'
    end

    it 'paginates products' do
      visit reviews_path(shop_id: shop.id)

      expect(page).to have_text('Youngest')
      expect(page).to have_text('Middle')
      expect(page).not_to have_text('Oldest')

      click_on 'Next'

      expect(page).not_to have_text('Youngest')
      expect(page).not_to have_text('Middle')
      expect(page).to have_text('Oldest')
    end
  end
end
