
puts("IMPORTANT NOTE: This seed may run quite long, so you may want to run this command\n\t$ pg_restore --verbose --clean --no-acl --no-owner -h localhost -d challenge_development db/challenge_development.dump".yellow)
puts("But first, you'd need to download our prepared DB dump file from https://drive.google.com/file/d/1qpp82e_SiKPltnUHDyWItAerGs4rwQxy/view?usp=sharing to `db/challenge_development.dump`".yellow)


500.times.map{ |i| Shop.create(name: Faker::Company.name) }

def create_products_for_shop(shop, products_count = 1000)
  Product.transaction do
    old_logger = ActiveRecord::Base.logger
    ActiveRecord::Base.logger = nil
    products_count.times do
      Product.create(shop: shop, title: "#{Faker::Commerce.product_name} #{SecureRandom.hex.last(4)}")
      print('.')
    end
    ActiveRecord::Base.logger = old_logger
  end
end

def create_reviews_for_product(product)
  Review.transaction do
    old_logger = ActiveRecord::Base.logger
    ActiveRecord::Base.logger = nil
    50.times.each do |i|
      review = Review.create(product: product, rating: (i % 5 ) + 1, body: Faker::Quote.famous_last_words)
      print('.')
    end
    ActiveRecord::Base.logger = old_logger
  end
end

def create_reviews_for_shop(shop, products_limit = 100)
  shop.products.limit(products_limit).each do |product|
    create_reviews_for_product(product)
  end.count
end


Shop.find_each do |shop| create_products_for_shop(shop) end
Shop.find_each do |shop| create_reviews_for_shop(shop) end
