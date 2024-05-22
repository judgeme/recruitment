# frozen_string_literal: true

FactoryBot.define do
  factory :product do
    association :shop
    title { Faker::Commerce.product_name }

    trait :with_reviews do
      transient do
        ratings { [3.2, 4.5, 4.8] }
      end

      after(:create) do |product, evaluator|
        evaluator.ratings.each do |rating|
          create(:review, rating: rating, product: product)
        end
      end
    end
  end
end
