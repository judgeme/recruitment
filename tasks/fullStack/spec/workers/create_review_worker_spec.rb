require 'rails_helper'

RSpec.describe CreateReviewWorker do
  context 'for a given product' do
    let(:shop) { create :shop, name: 'My Cool Shop' }

    let(:product) { create :product, title: 'My Cool Product', shop: shop }

    let(:params) do
      {
        'product_id' => product.id.to_s,
        'rating' => '4',
        'reviewer_name' => 'James',
        'body' => 'Foo bar.',
      }
    end

    subject { CreateReviewWorker.new }

    it 'creates a review with the default tag' do
      expect { subject.perform(params) }.to change { Review.count }.by(1)

      review = Review.last

      expect(review.product_id).to eq(product.id)
      expect(review.rating).to eq(4.0)
      expect(review.reviewer_name).to eq('James')
      expect(review.body).to eq('Foo bar.')
      expect(review.tags).to eq(['default'])
    end

    context 'whose shop has tags' do
      setup { shop.update(tags: ['foo', 'bar'] ) }

      it "creates a review with the shop's tags" do
        expect { subject.perform(params) }.to change { Review.count }.by(1)

        expect(Review.last.tags).to eq(['foo', 'bar'])
      end
    end
  end
end
