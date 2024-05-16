# frozen_string_literal: true

FactoryBot.define do
  factory :review do
    association :product
    body { Faker::Lorem.paragraph }
    rating { Faker::Number.between(from: 1, to: 5) }
    reviewer_name { Faker::Name.name }
    tags { [Faker::Lorem.word, Faker::Lorem.word] }
  end
end
