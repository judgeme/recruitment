# frozen_string_literal: true

module ShopsHelper
  #   # TODO: clean this up
  #   def reviews_aggregator
  #     @reviews_aggregator ||= Reviews::Aggregator.new(shop: @shop).call
  #   end

  def avg_rating(shop)
    reviews = shop.reviews

    reviews.average(:rating).round(1)
  end

  def avg_rating_until(shop, months_ago:)
    reviews = shop.reviews

    reviews
      .before_date(months_ago.month.ago)
      .average(:rating)
      .round(1)
  end

  def month_to_s(months_ago:)
    Date::MONTHNAMES[months_ago.month.ago.month]
  end
end
