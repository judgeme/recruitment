module ReviewsHelper

  def rating(review)
    '&#9733;'.html_safe*review.rating.to_i
  end

  def recent_reviews_for(product)
    product
      .reviews
      .order(created_at: :desc)
      .limit(10)
  end

  # Paginated products whose reviews will be displayed
  def reviewed_products
    @products ||= shop
      .products
      .includes(:reviews)
      .order(created_at: :desc)
      .paginate(page: params[:page], per_page: 2)
  end

  def shop
    @shop ||= Shop.find(params[:shop_id])
  end

end
