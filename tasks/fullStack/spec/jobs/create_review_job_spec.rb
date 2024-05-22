# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CreateReviewJob, type: :job do
  it 'does something' do
    product = create(:product)
    params = {
      body: 'This is a review',
      rating: 4.5,
      tags: %w[good bad],
      reviewer_name: 'John Doe'
    }

    form = instance_double(Forms::CreateReviewForm)

    expect(Forms::CreateReviewForm).to receive(:new)
      .with(product: product, params: params)
      .and_return(form)

    expect(form).to receive(:save)

    CreateReviewJob.perform_now(product, params)
  end
end
