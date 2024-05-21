require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => "/sidekiq" # mount Sidekiq::Web in your Rails app

  resources :reviews, only: [:index, :create] do
  end

  resources :products, only: [:index]
  resources :products, only: [:index] do
    resources :reviews, only: %i[index new create], module: :products
  end
end
