# frozen_string_literal: true

class CreateReviewJob < ApplicationJob
  queue_as :reviews

  def perform(product, params)
    Forms::CreateReviewForm.new(product: product, params: params).save
  end
end
