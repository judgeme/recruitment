# # frozen_string_literal: true

module Forms
  class CreateReviewForm
    include ActiveModel::Model

    attr_accessor :product, :body, :rating, :tags, :reviewer_name

    def initialize(product:, params:)
      @product = product

      super(params)
    end

    validates :product, presence: true
    validates :body, presence: true
    validates :rating, presence: true
    validates :reviewer_name, presence: true

    def save
      return false unless valid?

      review.save

      true
    end

    private

    delegate :shop, to: :product

    def review_params
      {
        product_id: product.id,
        body: body,
        rating: rating,
        reviewer_name: reviewer_name,
        tags: tags || Shop::DEFAULT_TAGS
      }
    end

    def review
      @review ||= Review.new(review_params)
    end
  end
end
