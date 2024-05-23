# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Visiting Products Page', type: :system, js: true do
  context 'when visiting products page' do
    it 'displays dropdown to filter by shops' do
      shop1 = create(:shop)
      product1 = create(:product, shop: shop1)
      # review1 = create(:review, product: product1)

      shop2 = create(:shop)
      product2 = create(:product, shop: shop2)
      # review2 = create(:review, product: product2)

      visit products_path

      expect(page).to have_select(
        'q_shop_id_eq',
        # selected: shop1.id,
        options: ['', shop1.name, shop2.name]
      )

      expect(page).to have_content(product1.title)
      expect(page).to have_content(product2.title)

      select(shop2.name, from: 'q_shop_id_eq')

      expect(page).to have_select(
        'q_shop_id_eq',
        selected: shop2.name,
        options: ['', shop1.name, shop2.name]
      )

      within('.product-results') do
        expect(page).to have_content(product2.title)
        expect(page).not_to have_content(product1.title)
      end
    end
  end
end

# 1: within(dropdown) { find("option[value='#{shop2.name}']") }
# 2: dropdown = find('select[name="q[shop_id_eq]"')
# 3: within(dropdown) { find("option[value='#{shop2.name}']") }
# 4: dropdown['innerHTML']
# 5: within(dropdown) { find("option[value='#{shop2.id}']") }
# 6: within(dropdown) { find("option[value='#{shop2.id}']").click }
# 7: current_url
