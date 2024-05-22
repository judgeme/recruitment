# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Forms::CreateReviewForm, type: :model do
  describe '#save' do
    context 'with valid params' do
      it 'creates a review' do
        product = create(:product)
        params = {
          body: 'This is a review',
          rating: 4.5,
          tags: %w[good bad],
          reviewer_name: 'John Doe'
        }

        form = Forms::CreateReviewForm.new(product: product, params: params)

        expect do
          expect(form.save).to be(true)
        end
          .to change(Review, :all)
          .from([])
          .to(
            a_collection_containing_exactly(
              an_object_having_attributes(
                body: 'This is a review',
                rating: 4.5,
                tags: %w[good bad],
                reviewer_name: 'John Doe'
              )
            )
          )
      end

      context 'when tags are not provided' do
        it 'creates a review with default tags' do
          product = create(:product)
          params = {
            body: 'This is a review',
            rating: 4.5,
            reviewer_name: 'John Doe'
          }

          form = Forms::CreateReviewForm.new(
            product: product,
            params: params
          )

          expect { form.save }
            .to change(Review, :all)
            .from([])
            .to(
              a_collection_containing_exactly(
                an_object_having_attributes(
                  body: 'This is a review',
                  rating: 4.5,
                  tags: Shop::DEFAULT_TAGS,
                  reviewer_name: 'John Doe'
                )
              )
            )
        end
      end
    end

    context 'with valid params' do
      it 'raises error' do
        product = create(:product)
        params = {}

        form = Forms::CreateReviewForm.new(product: product, params: params)

        expect do
          expect(form.save).to be(false)
          expect(form.errors[:body]).to include "can't be blank"
          expect(form.errors[:rating]).to include "can't be blank"
          expect(form.errors[:reviewer_name]).to include "can't be blank"
        end.not_to change(Review, :count)
      end
    end
  end
end
