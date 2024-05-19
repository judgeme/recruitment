class CreateReviewWorker

  include Sidekiq::Worker

  DEFAULT_TAGS = ['default']

  def perform(params)
    Review.create(params) do |r|
      # Reviews derive their tags from the shop they belong to
      r.tags = r.product.shop.tags || DEFAULT_TAGS
    end
  end

end
