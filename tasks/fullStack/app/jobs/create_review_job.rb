class CreateReviewJob < ApplicationJob
  queue_as :default

  def perform(review)
    review.save
  end
end
