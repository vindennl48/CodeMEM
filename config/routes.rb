Rails.application.routes.draw do
  resources :posts

  post 'filter', to: 'posts#filter'

  root 'posts#index'
end
