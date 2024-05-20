require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => "/sidekiq" # mount Sidekiq::Web in your Rails app

  resources :reviews, only: [:index, :create, :new] do
    member do
      get :update_reviews
    end
  end

  get 'products/search', to: 'products#search'
end
