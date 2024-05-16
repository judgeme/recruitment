# frozen_string_literal: true

FactoryBot.define do
  factory :product do
    association :shop
    title { Faker::Commerce.product_name }
  end
end
