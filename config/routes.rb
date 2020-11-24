Rails.application.routes.draw do
  devise_for :users
  resources :search_attendancies, except: [:destroy]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :search_attendancies, only: [ :show, :update ]
    end
  end

  root to: 'pages#home'
end
