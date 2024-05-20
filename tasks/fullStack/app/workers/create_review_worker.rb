class CreateReviewWorker
  include Sidekiq::Worker

  sidekiq_options retry: false

  def perform(rating, body, reviewer_name, product_id)
    Review.create!(
      rating: rating.to_f,
      body: body,
      reviewer_name: reviewer_name,
      product_id: product_id.to_i
    )
  end
end
