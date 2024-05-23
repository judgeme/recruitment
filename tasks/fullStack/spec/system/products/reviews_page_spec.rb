# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Visiting Products Reviews Page', type: :system, js: true do
  context 'when visiting products reviews page' do
    it 'displays reviews' do
      product = create(:product)
      review1 = create(:review, rating: 2.0, product: product)
      review2 = create(:review, rating: 3.0, reviewer_name: nil, product: product)

      visit product_reviews_path(product)

      expect(page).to have_content(review1.reviewer_name)
      expect(page).to have_content("Rating #{review1.rating}")
      expect(page).to have_content(review1.body)

      expect(page).to have_content('Reviewer name not available')
      expect(page).to have_content("Rating #{review2.rating}")
      expect(page).to have_content(review2.body)
    end

    it 'paginates showing only 3 reviews' do
      product = create(:product)
      review1 = create(:review, rating: 1.0, product: product)
      review2 = create(:review, rating: 2.0, product: product)
      review3 = create(:review, rating: 3.0, product: product)
      review4 = create(:review, rating: 4.0, product: product)

      visit product_reviews_path(product)

      expect(page).to have_content(review1.reviewer_name)
      expect(page).to have_content("Rating #{review1.rating}")
      expect(page).to have_content(review1.body)

      expect(page).to have_content(review2.reviewer_name)
      expect(page).to have_content("Rating #{review2.rating}")
      expect(page).to have_content(review2.body)

      expect(page).to have_content(review3.reviewer_name)
      expect(page).to have_content("Rating #{review3.rating}")
      expect(page).to have_content(review3.body)

      expect(page).not_to have_content(review4.reviewer_name)
      expect(page).not_to have_content("Rating #{review4.rating}")
      expect(page).not_to have_content(review4.body)
    end
  end
end
