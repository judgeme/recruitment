class ShopRatingsCalculator

  def initialize(shop:)
    @shop = shop
  end

  def recent_monthly_changes(count)
    averages = previous_month_ranges(count + 1)
      .map { |month_range| [month_range, average_rating(month_range)] }

    with_next(averages).map do |last_month, this_month|
      last_month_range, last_month_avg = last_month
      this_month_range, this_month_avg = this_month

      months = [last_month_range, this_month_range].map { |r| r.first.month }

      if this_month_avg.nil? || last_month_avg.nil?
        change = 'missing data'
      else
        change = this_month_avg - last_month_avg
      end

      [months, change]
    end
  end

  private

  attr_reader :shop

  def average_rating(date_range)
    shop
      .reviews
      .where(created_at: date_range)
      .average(:rating)
  end

  def previous_month_ranges(count)
    first_days = previous_months(count + 1)

    with_next(first_days)
      .map { |first_day, next_first_day| first_day...next_first_day }
  end

  def previous_months(count)
    (1..count).map { |n| n.months.ago.beginning_of_month }
  end

  def with_next(collection)
    collection[1...].zip(collection[...-1])
  end

end
