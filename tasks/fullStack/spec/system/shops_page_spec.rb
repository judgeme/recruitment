# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Visiting A Shop Page', type: :system do
  context 'when visiting a shop page' do
    before { travel_to(Time.zone.local(2023, 10, 17, 7, 24)) }
    after { travel_back }

    it 'displays shop information' do
      created_sept = Time.zone.local(2023, 9, 17, 7, 24)
      created_aug = Time.zone.local(2023, 8, 17, 7, 24)
      created_jul = Time.zone.local(2023, 7, 17, 7, 24)

      shop = create(:shop)
      product = build(:product, shop: shop)

      create(:review, rating: 4.0, product: product, created_at: created_sept)
      create(:review, rating: 4.4, product: product, created_at: created_sept)

      create(:review, rating: 4.0, product: product, created_at: created_aug)
      create(:review, rating: 3.0, product: product, created_at: created_aug)

      create(:review, rating: 4.6, product: product, created_at: created_jul)
      create(:review, rating: 5.0, product: product, created_at: created_jul)

      visit shop_path(shop.id)

      expect(page).to have_content(shop.name)

      # (4.0 + 4.4 + 4.0 + 3.0 + 4.6 + 5.0) / 6
      expect(page).to have_content('Average rating overall: 4.2')

      # REVIEW: aggregation content
      expect(page).to have_content('Average rating in September: 4.2')
      expect(page).to have_content('Average rating in August: 3.5')
      expect(page).to have_content('Average rating in July: 4.8')
      expect(page).to have_content('From July to August -1.3')
      expect(page).to have_content('From August to September +0.7')
    end
  end
end
